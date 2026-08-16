# Guia didático — API de Produtos (Express)

## 1. O que é uma API

API significa **Application Programming Interface** (Interface de Programação de Aplicações). É, na prática, um "cardápio" de operações que um sistema oferece para outros sistemas (ou para uma interface visual) conversarem com ele, sem precisar saber como ele funciona por dentro.

Pense em um restaurante: você não entra na cozinha para preparar seu prato. Você olha o cardápio (a API), pede um item específico, e a cozinha (o servidor) devolve o prato pronto. Você não precisa saber como o prato foi feito — só precisa saber o que pedir e o que esperar de volta.

No nosso caso, a "cozinha" é o servidor Node.js/Express, o "cardápio" são os endpoints (`/product`), e quem "pede" pode ser um navegador, um app mobile, outro servidor, ou o `curl` no terminal.

---

## 2. Que tipo de API é essa: API REST

REST (**Re**presentational **S**tate **T**ransfer) é um **estilo de arquitetura** para construir APIs — um conjunto de convenções, não uma biblioteca ou ferramenta. A ideia central:

- Cada **recurso** (uma entidade do seu sistema — aqui, "produto") tem uma **URL própria**: `/product`.
- A **ação** que você quer realizar sobre esse recurso é expressa pelo **verbo HTTP** da requisição, não por palavras na URL.

É por isso que nunca vemos rotas como `/criarProduto` ou `/listarTodosProdutos`. A URL é sempre a mesma (`/product`); o que muda é o verbo:

| Quero... | URL | Verbo |
|---|---|---|
| Listar produtos | `/product` | GET |
| Criar um produto | `/product` | POST |
| Atualizar um produto | `/product/:id` | PUT ou PATCH |
| Apagar um produto | `/product/:id` | DELETE |

Uma API que segue esse padrão é chamada de **RESTful**. É o estilo mais comum na web hoje — usado por praticamente toda API pública que você já consumiu (redes sociais, serviços de pagamento, previsão do tempo, etc).

---

## 3. Como a comunicação funciona, passo a passo

```
1. Cliente (navegador, app, curl) monta uma requisição HTTP:
   → Método: GET, POST, PUT, PATCH ou DELETE
   → URL: /product ou /product/:id
   → Corpo (body): dados em JSON, quando aplicável (POST, PUT, PATCH)

2. Servidor Express recebe a requisição e a roteia
   (routes/products.js decide qual função vai tratar isso)

3. A função correspondente manipula os dados
   (data/products.js: consulta, cria, altera ou remove)

4. Servidor devolve uma resposta HTTP:
   → Status code (200, 201, 204, 400, 404...)
   → Corpo (body): o produto, a lista, ou uma mensagem de erro, em JSON
```

Tudo isso acontece em milissegundos, e é exatamente esse ciclo que se repete a cada clique na interface.

---

## 4. Os métodos (verbos HTTP) usados neste projeto

### GET — buscar informação
Nunca deve alterar dados no servidor, só ler.
- `GET /product` → devolve a lista de todos os produtos
- `GET /product/:id` → devolve um produto específico

### POST — criar um novo recurso
O cliente envia os dados do novo produto no corpo da requisição; o servidor cria e devolve o produto já com um `id` atribuído.
- `POST /product`

### PUT — substituir um recurso inteiro
O cliente precisa enviar **todos** os campos do produto. O servidor descarta a versão antiga e coloca a nova no lugar. Se você omitir um campo, ele é tratado como ausente.
- `PUT /product/:id`

### PATCH — atualizar parte de um recurso
O cliente envia só os campos que quer mudar. O servidor faz um "merge": atualiza o que foi enviado e mantém o resto como estava.
- `PATCH /product/:id`

### DELETE — remover um recurso
- `DELETE /product/:id`

**Resumo da diferença PUT × PATCH** (ponto que costuma confundir): PUT = "aqui está a versão completa e definitiva, substitua tudo". PATCH = "mude só isso aqui, deixe o resto igual".

---

## 5. Os códigos de status HTTP usados

Todo código de status é um número de 3 dígitos que a resposta carrega, indicando o que aconteceu:

| Código | Nome | Quando aparece |
|---|---|---|
| 200 | OK | Sucesso, com conteúdo na resposta (GET, PUT, PATCH) |
| 201 | Created | Sucesso ao criar um novo recurso (POST) |
| 204 | No Content | Sucesso, mas sem corpo de resposta (DELETE) |
| 400 | Bad Request | O cliente enviou dados inválidos ou incompletos |
| 404 | Not Found | O recurso pedido (o `id`) não existe |

Esses códigos são padronizados e usados por praticamente toda API HTTP do mundo — não é uma convenção só deste projeto.

---

## 6. Estrutura de pastas e o papel de cada arquivo

```
api-produtos/
├── server.js              → ponto de entrada: liga o servidor, conecta rotas e a interface
├── package.json           → identidade do projeto e dependências (express)
├── data/
│   └── products.js        → "banco de dados" em memória + funções de manipulação
├── routes/
│   └── products.js        → define os endpoints /product e o que cada um faz
└── public/                → a interface web (servida pelo próprio Express)
    ├── index.html          → estrutura da página (formulário + tabela)
    ├── style.css           → aparência
    └── app.js              → lógica: chama a API com fetch() a partir do navegador
```

**Por que separar assim?** Cada arquivo tem uma única responsabilidade:
- `data/products.js` sabe *onde os dados moram* e como manipulá-los.
- `routes/products.js` sabe *o que fazer quando alguém chama `/product`* com determinado verbo.
- `server.js` só *junta as peças* e liga o servidor.
- `public/` é *tudo que roda no navegador do usuário*, separado do que roda no servidor.

Essa separação facilita trocar peças no futuro — por exemplo, trocar o array em memória por um banco de dados real sem precisar mexer nas rotas ou na interface.

---

## 7. A interface web

A interface (`public/`) é uma segunda "aplicação" que conversa com a mesma API, só que a partir do navegador em vez do terminal.

- **`index.html`** define a estrutura: um formulário para criar/editar produtos e uma tabela para listá-los.
- **`style.css`** cuida só da aparência.
- **`app.js`** é o que faz a interface "funcionar" — usa a função `fetch()` do JavaScript (nativa do navegador) para chamar a API, exatamente como fizemos manualmente com `curl`:

| Ação na tela | Chamada feita pelo `app.js` |
|---|---|
| Página carrega | `fetch("/product")` → GET, desenha a tabela |
| Clica em "Criar produto" | `fetch("/product", { method: "POST", ... })` |
| Clica em "Editar" | `fetch("/product/:id")` → GET, preenche o formulário |
| Salva a edição | `fetch("/product/:id", { method: "PUT", ... })` |
| Clica em "Excluir" | `fetch("/product/:id", { method: "DELETE" })` |

**Por que a interface e a API rodam no mesmo servidor (mesma porta)?** Porque assim o navegador entende que são a "mesma origem" e libera as chamadas `fetch()` sem bloqueio. Se estivessem em servidores/portas diferentes, o navegador bloquearia essas requisições por segurança (política chamada CORS), a menos que o servidor fosse configurado para permitir isso explicitamente.

---

## 8. Sobre a persistência dos dados (atenção aqui)

Os produtos ficam guardados em um **array na memória** do processo Node (`data/products.js`), não em um arquivo ou banco de dados real. Isso significa:

- Enquanto o servidor está rodando, tudo funciona normalmente: criar, editar e excluir refletem de verdade.
- **Se você parar o servidor (`Ctrl+C`) e rodar `node server.js` de novo, os dados voltam ao estado inicial** (os 3 produtos de exemplo). Tudo que foi criado na sessão anterior se perde.

Isso foi uma escolha deliberada para simplificar o aprendizado do REST/CRUD sem a complexidade extra de configurar um banco de dados. Para persistência de verdade entre reinicializações, o próximo passo seria trocar `data/products.js` por leitura/escrita em um arquivo JSON, ou por um banco como SQLite.

---

## 9. Como rodar o projeto do zero

```bash
cd api-produtos
npm install
node server.js
```

Você verá no terminal:
```
Servidor rodando em http://localhost:3000
```

Abra o navegador em:
```
http://localhost:3000
```

**Importante:** acesse sempre por essa URL (servida pelo Express). Não abra o `index.html` diretamente com duplo clique ou por uma extensão tipo Live Server — nesse caso não existe servidor por trás, e o `fetch("/product")` da interface não encontra nada para conversar.

Se quiser testar a API diretamente (sem a interface), pode continuar usando `curl` ou Postman normalmente — a API continua exposta em `/product` mesmo com a interface ativa.

---

## 10. Glossário rápido

- **Endpoint**: combinação de uma URL + um verbo HTTP (ex: `GET /product`).
- **JSON**: formato de texto usado para trocar dados entre cliente e servidor.
- **Body (corpo)**: os dados enviados junto de uma requisição POST/PUT/PATCH.
- **Middleware**: função que processa a requisição antes dela chegar na rota final (ex: `express.json()`).
- **fetch()**: função do JavaScript do navegador para fazer requisições HTTP a partir do código que roda na página.
- **Same-origin**: quando dois recursos compartilham protocolo, domínio e porta — permite que o navegador libere chamadas `fetch()` entre eles sem bloqueio.
