// server.js
//
// Este é o ponto de entrada da aplicação. É ele que "liga" o servidor
// e conecta as rotas que criamos, além de servir a interface visual.

const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: ensina o Express a entender JSON no corpo (body) das
// requisições. Sem isso, req.body chegaria "undefined" nas rotas.
app.use(express.json());

// Serve os arquivos estáticos da pasta "public" (a interface visual:
// index.html, style.css, app.js). Como o Express serve a API e a
// interface na MESMA origem (mesmo host/porta), o fetch() do front-end
// não sofre bloqueio de CORS.
app.use(express.static(path.join(__dirname, "public")));

// Diz ao Express: "toda rota que começar com /product, jogue para
// o productsRouter cuidar". Por isso dentro de routes/products.js
// usamos "/" em vez de "/product" — o prefixo já é aplicado aqui.
app.use("/product", productsRouter);

// Middleware "coringa": roda quando nenhuma rota acima combinou
// com a requisição -> 404 genérico
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Liga o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});