
# 📘  Criando um Projeto Expo (Guia Completo)

## 🚀 **Introdução**

Este documento descreve, de forma clara e técnica, como criar um projeto utilizando o **Expo**, uma ferramenta que facilita o desenvolvimento de aplicações **React Native**.  
Aqui você encontrará os pré-requisitos, comandos necessários e uma explicação do fluxo de criação do projeto, seguindo as práticas recomendadas pela própria equipe do Expo.

----------

## 🖥️ **Requisitos do Sistema**

Antes de criar seu projeto, certifique-se de que possui:

-   **Node.js (versão LTS recomendada)**  
    👉 [https://nodejs.org/en/](https://nodejs.org/en/)
    
-   **Sistema operacional compatível:**
    
    -   Windows (PowerShell ou WSL 2)
        
    -   macOS
        
    -   Linux
        

O Expo funciona de forma consistente nesses ambientes.

----------

## 📦 **Criando um Novo Projeto**

A maneira recomendada de criar um projeto é utilizando o comando:

`npx create-expo-app@latest` 

Esse comando baixa automaticamente a versão mais recente do gerador de projetos do Expo.

----------

### 🔧 **Passo a passo da criação**

1.  Após executar o comando, o terminal exibirá:
    

`Need to install the following packages:
create-expo-app@<versão>
Ok to proceed? (y)` 

Digite:

`y` 

para confirmar a instalação.

----------

2.  Em seguida, o Expo iniciará o processo de criação e mostrará:
    

`Creating an Expo project using the default  template.` 

Esse é o template padrão, ideal para iniciantes e para quem deseja começar com um projeto limpo.

----------

### 📁 **Escolha de Templates**

O Expo possui templates adicionais que podem ser usados se você quiser algo mais avançado. Para visualizar todos, o próprio CLI mostra:

`To choose from  all available templates:
$ npx create-expo-app --template` 

E para explorar exemplos prontos:

`To choose from  all available examples:
$ npx create-expo-app --example` 

----------

### 📝 **Nomeando seu projeto**

Ao final do processo, o Expo perguntará:

`? What is your app named? » my-app` 

Digite o nome desejado. Este nome será o nome da pasta e da aplicação.

----------

## ▶️ **Rodando o Projeto Pela Primeira Vez**

Entre na pasta criada:

`cd nome-do-projeto` 

Depois execute:

`npx expo start` 

Isso abrirá o **Expo DevTools** no navegador e permitirá que você:

-   Rode o app no celular usando o **Expo Go**
    
-   Rode no emulador Android/iOS
    
-   Veja logs e erros em tempo real
    

----------

## 📱 **Testando no Celular (Expo Go)**

1.  Instale o app Expo Go:
    
    -   **Android:** Google Play
        
    -   **iOS:** App Store
        
2.  Abra o Expo Go e escaneie o QR Code exibido no terminal ou na interface web do Expo.
    

Seu aplicativo será carregado instantaneamente no dispositivo.

----------

## 🧹 **Observações Importantes**

-   O `create-expo-app` pode criar uma pasta `.git` dentro do projeto.  
    Caso você esteja colocando o projeto dentro de outro repositório Git, recomenda-se **remover o `.git` interno** para evitar a criação de submódulos.
    
-   Para remover:
    
    `rmdir /s /q .git # Windows  rm -rf .git # macOS / Linux`
