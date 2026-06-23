const API_BASE_URL = "http://localhost:3000";

function getAuthHeaders(extraHeaders = {}) {
  const token = localStorage.getItem("token");

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(response) {
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Erro ao conectar com o servidor.");
  }

  return body;
}

function normalizeProduct(product) {
  return {
    ...product,
    id_prod: product.id_prod,
    nome: product.nome ?? product.nome_produto,
    preco: product.preco ?? product.preco_produto,
    qtd_estoque: product.qtd_estoque ?? product.quantidade_estoque_produto,
    empresa_nome: product.empresa_nome ?? product.nome_empresa,
  };
}

export const productService = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/viewProd`);
    const products = await handleResponse(response);
    return products.map(normalizeProduct);
  },

  async getCompanies() {
    const response = await fetch(`${API_BASE_URL}/empresas`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async createProduct(data) {
    const response = await fetch(`${API_BASE_URL}/produtos`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },
};
