// routes/products.js
//
// Aqui ficam definidos os ENDPOINTS relacionados a produtos.
// Um "endpoint" é a combinação de uma URL + um verbo HTTP.
// Ex: GET /product é um endpoint. POST /product é outro, diferente,
// mesmo usando a mesma URL.

const express = require("express");
const router = express.Router(); // um "mini app" só para rotas de produto
const db = require("../data/products");

// Função auxiliar: verifica se o corpo (body) da requisição é válido
// antes de criar/atualizar um produto. Isso é o que nos permite
// devolver 400 (Bad Request) quando o cliente manda dados incompletos.
function isValidProduct(body) {
  return (
    body &&
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.price === "number" &&
    body.price >= 0
  );
}

// ------------------------------------------------------------------
// GET /product  ->  lista TODOS os produtos
// Verbo GET = "me dê informação", nunca deve alterar dados.
// ------------------------------------------------------------------
router.get("/", (req, res) => {
  const products = db.getAll();
  return res.status(200).json(products); // 200 = OK, deu tudo certo
});

// ------------------------------------------------------------------
// GET /product/:id  ->  busca UM produto específico
// ":id" é um parâmetro de rota. Se a URL for /product/5, então
// req.params.id será a string "5".
// ------------------------------------------------------------------
router.get("/:id", (req, res) => {
  const id = Number(req.params.id); // converte "5" -> 5
  const product = db.getById(id);

  if (!product) {
    // 404 = Not Found, o recurso pedido não existe
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  return res.status(200).json(product);
});

// ------------------------------------------------------------------
// POST /product  ->  cria um novo produto
// Verbo POST = "aqui está um recurso novo, crie-o para mim"
// ------------------------------------------------------------------
router.post("/", (req, res) => {
  if (!isValidProduct(req.body)) {
    // 400 = Bad Request, o cliente mandou dados inválidos
    return res.status(400).json({
      error:
        "Dados inválidos. 'name' (string) e 'price' (number) são obrigatórios.",
    });
  }

  const newProduct = db.create({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock ?? 0, // se não vier estoque, assume 0
  });

  // 201 = Created, novo recurso criado com sucesso
  return res.status(201).json(newProduct);
});

// ------------------------------------------------------------------
// PUT /product/:id  ->  substitui o produto INTEIRO
// Verbo PUT = "aqui está a versão completa e definitiva deste
// recurso, jogue fora a antiga e use essa"
// Por isso TODOS os campos são obrigatórios aqui.
// ------------------------------------------------------------------
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!isValidProduct(req.body)) {
    return res.status(400).json({
      error:
        "Para PUT, envie o objeto completo: 'name' e 'price' são obrigatórios.",
    });
  }

  const updated = db.replace(id, {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock ?? 0,
  });

  if (!updated) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  return res.status(200).json(updated);
});

// ------------------------------------------------------------------
// PATCH /product/:id  ->  atualiza PARCIALMENTE o produto
// Verbo PATCH = "mude só esses campos específicos que estou
// mandando, deixe o resto como está"
// ------------------------------------------------------------------
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: "Envie ao menos um campo para atualizar." });
  }

  const updated = db.update(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  return res.status(200).json(updated);
});

// ------------------------------------------------------------------
// DELETE /product/:id  ->  remove o produto
// Verbo DELETE = "apague este recurso"
// ------------------------------------------------------------------
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const removed = db.remove(id);

  if (!removed) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  // 204 = No Content. Deu certo, mas não há nada para devolver no corpo.
  return res.status(204).send();
});

module.exports = router;