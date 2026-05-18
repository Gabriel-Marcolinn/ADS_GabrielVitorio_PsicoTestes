import { getAuthHeaders } from "./authService.js";

const BASE_URL = "http://localhost:8080/api/empresas";

async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    return response.json();
  }

  let mensagem = "Erro desconhecido";
  try {
    const erro = await response.json();
    mensagem = erro.message || erro.error || JSON.stringify(erro);
  } catch {
    mensagem = await response.text();
  }
  throw new Error(mensagem);
}

// CADASTRO
export async function cadastrarEmpresa(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarEmpresas() {
  const response = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// BUSCAR ID
export async function buscarEmpresaPorId(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ATUALIZAR
export async function atualizarEmpresa(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// REMOVER
export async function deletarEmpresa(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// INATIVAR
export async function inativarEmpresa(id) {
  const response = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
