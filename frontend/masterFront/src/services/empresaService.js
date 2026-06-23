const API_URL = "http://localhost:3000/empresas";

function getAuthHeaders(extraHeaders = {}) {
  const token = localStorage.getItem("token");

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const handleResponse = async (response) => {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Erro ao conectar com o servidor.");
  }
  return body;
};

export const empresaService = {
  async getEmpresas() {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async getEmpresaById(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async createEmpresa(data) {
    const payload = {
      razao_social: data.razaoSocial,
      cnpj: data.cnpj,
      telefone: data.telefone,
    };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async updateEmpresa(id, data) {
    const payload = {
      razao_social: data.razaoSocial,
      cnpj: data.cnpj,
      telefone: data.telefone,
    };
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async deleteEmpresa(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
