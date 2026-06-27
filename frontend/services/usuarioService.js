import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

const BASE_URL = "http://localhost:8080/api/usuarios";

// CADASTRO
export async function cadastrarUsuario(data) {
  const response = await fetchAutenticado(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarUsuarios(empresaId, ativo) {
  const response = await fetchAutenticado(
    `${BASE_URL}?empresaId=${empresaId}&ativo=${ativo}`,
    { headers: getAuthHeaders() },
  );
  return handleResponse(response);
}

export async function listarTodosUsuarios() {
  const response = await fetchAutenticado(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ATUALIZAR
export async function atualizarUsuario(id, data) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// INATIVAR
export async function inativarUsuario(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// DELETAR
export async function deletarUsuario(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
