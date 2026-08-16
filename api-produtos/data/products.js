// data/products.js
//
// Aqui simulamos um banco de dados usando um array em memória.
// Em um projeto real, isso seria substituído por chamadas a um banco
// de verdade (MySQL, PostgreSQL, MongoDB etc). Mas a LÓGICA de negócio
// (buscar, criar, atualizar, remover) continua sendo a mesma ideia.

// Array que guarda os produtos. Começa com alguns itens de exemplo.
let products = [
  { id: 1, name: "Teclado Mecânico", price: 249.9, stock: 15 },
  { id: 2, name: "Mouse Gamer", price: 129.9, stock: 30 },
  { id: 3, name: "Monitor 24'", price: 899.0, stock: 8 },
];

// Contador para gerar o próximo id disponível.
// Em um banco real isso seria automático (auto-incremento / UUID).
let nextId = 4;

// Retorna TODOS os produtos. Usado pelo GET /product
function getAll() {
  return products;
}

// Busca um produto específico pelo id. Usado pelo GET /product/:id
function getById(id) {
  return products.find((p) => p.id === id);
}

// Cria um novo produto e devolve ele já com o id atribuído.
// Usado pelo POST /product
function create(data) {
  const newProduct = { id: nextId++, ...data };
  products.push(newProduct);
  return newProduct;
}

// Substitui um produto INTEIRO (todos os campos são trocados).
// Usado pelo PUT /product/:id
function replace(id, data) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null; // não achou -> devolve null
  products[index] = { id, ...data };
  return products[index];
}

// Atualiza APENAS os campos enviados, mantendo o resto como estava.
// Usado pelo PATCH /product/:id
function update(id, data) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  // "..." (spread) mescla o objeto antigo com os campos novos
  products[index] = { ...products[index], ...data };
  return products[index];
}

// Remove um produto pelo id. Devolve true/false indicando sucesso.
// Usado pelo DELETE /product/:id
function remove(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

// Exportamos as funções para que routes/products.js possa usá-las
module.exports = { getAll, getById, create, replace, update, remove };