// public/app.js
//
// Este arquivo roda no NAVEGADOR (client-side), diferente de tudo que
// vimos até agora, que rodava no servidor Node. É ele que chama a API
// usando fetch() e monta a tela dinamicamente.

const API_URL = "/product"; // como o front é servido pelo próprio Express,
                             // usamos caminho relativo (mesma origem = sem CORS)

const form = document.getElementById("product-form");
const idField = document.getElementById("product-id");
const nameField = document.getElementById("name");
const priceField = document.getElementById("price");
const stockField = document.getElementById("stock");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formMsg = document.getElementById("form-msg");
const tableBody = document.getElementById("table-body");
const refreshBtn = document.getElementById("refresh-btn");
const statusEl = document.getElementById("status");

// Formata número como moeda brasileira, só para exibição
function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Mostra uma mensagem temporária no formulário (sucesso ou erro)
function showFormMessage(text, type) {
  formMsg.textContent = text;
  formMsg.className = "form-msg " + type;
}

// -------------------------------------------------------------
// READ — GET /product
// Busca a lista de produtos e desenha a tabela
// -------------------------------------------------------------
async function loadProducts() {
  tableBody.innerHTML = `<tr><td colspan="5" class="empty">Carregando…</td></tr>`;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Falha ao buscar produtos");
    const products = await res.json();

    statusEl.textContent = "servidor online";
    statusEl.className = "status online";

    if (products.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="empty">Nenhum produto cadastrado ainda.</td></tr>`;
      return;
    }

    // Monta uma linha <tr> para cada produto
    tableBody.innerHTML = products
      .map(
        (p) => `
        <tr>
          <td>${p.id}</td>
          <td>${escapeHtml(p.name)}</td>
          <td>${formatPrice(p.price)}</td>
          <td>${p.stock ?? 0}</td>
          <td>
            <div class="row-actions">
              <button class="btn" onclick="startEdit(${p.id})">Editar</button>
              <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Excluir</button>
            </div>
          </td>
        </tr>`
      )
      .join("");
  } catch (err) {
    statusEl.textContent = "servidor offline";
    statusEl.className = "status offline";
    tableBody.innerHTML = `<tr><td colspan="5" class="empty">Não foi possível carregar os produtos. O servidor está rodando?</td></tr>`;
  }
}

// Evita que texto digitado pelo usuário quebre o HTML da tabela
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// -------------------------------------------------------------
// CREATE / UPDATE — o mesmo formulário serve para os dois casos.
// Se "product-id" estiver vazio -> POST (criar)
// Se "product-id" tiver um valor -> PUT (atualizar tudo)
// -------------------------------------------------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // impede o navegador de recarregar a página

  const id = idField.value;
  const payload = {
    name: nameField.value.trim(),
    price: Number(priceField.value),
    stock: stockField.value ? Number(stockField.value) : 0,
  };

  const isEditing = Boolean(id);
  const url = isEditing ? `${API_URL}/${id}` : API_URL;
  const method = isEditing ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // res.ok é falso para status 400, 404, 500...
      showFormMessage(data.error || "Erro ao salvar produto", "error");
      return;
    }

    showFormMessage(
      isEditing ? "Produto atualizado com sucesso." : "Produto criado com sucesso.",
      "ok"
    );
    resetForm();
    loadProducts();
  } catch (err) {
    showFormMessage("Não foi possível conectar ao servidor.", "error");
  }
});

// -------------------------------------------------------------
// Preenche o formulário com os dados do produto para editar.
// Usa GET /product/:id para buscar os dados atuais.
// -------------------------------------------------------------
async function startEdit(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return;
  const product = await res.json();

  idField.value = product.id;
  nameField.value = product.name;
  priceField.value = product.price;
  stockField.value = product.stock ?? 0;

  formTitle.textContent = `Editando produto #${product.id}`;
  submitBtn.textContent = "Salvar alterações";
  cancelBtn.classList.remove("hidden");
  formMsg.textContent = "";
  nameField.focus();
}

// Volta o formulário ao estado de "criar novo produto"
function resetForm() {
  form.reset();
  idField.value = "";
  formTitle.textContent = "Novo produto";
  submitBtn.textContent = "Criar produto";
  cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", () => {
  resetForm();
  formMsg.textContent = "";
});

// -------------------------------------------------------------
// DELETE — DELETE /product/:id
// -------------------------------------------------------------
async function deleteProduct(id) {
  const confirmed = confirm(`Excluir o produto #${id}? Essa ação não pode ser desfeita.`);
  if (!confirmed) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (res.status === 204) {
    loadProducts();
  } else {
    alert("Não foi possível excluir o produto.");
  }
}

// Deixa as funções acessíveis pelos onclick="" gerados dinamicamente
window.startEdit = startEdit;
window.deleteProduct = deleteProduct;

refreshBtn.addEventListener("click", loadProducts);

// Carrega a lista assim que a página abre
loadProducts();