import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

const BASE_URL = "https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/empresas";

// CADASTRO
export async function cadastrarEmpresa(data) {
  const response = await fetchAutenticado(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarEmpresas() {
  const response = await fetchAutenticado(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// BUSCAR ID
export async function buscarEmpresaPorId(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ATUALIZAR
export async function atualizarEmpresa(id, data) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// REMOVER
export async function deletarEmpresa(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// INATIVAR
export async function inativarEmpresa(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
