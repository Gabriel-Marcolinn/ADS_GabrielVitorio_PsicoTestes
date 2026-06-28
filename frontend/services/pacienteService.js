import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

const BASE_URL = "https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/pacientes";

// CADASTRO
export async function cadastrarPaciente(data) {
  const response = await fetchAutenticado(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarPacientes(psicologoId, ativo) {
  const response = await fetchAutenticado(
    `${BASE_URL}?psicologoId=${psicologoId}&ativo=${ativo}`,
    { headers: getAuthHeaders() },
  );
  return handleResponse(response);
}

// ATUALIZAR
export async function atualizarPaciente(id, data) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// INATIVAR
export async function inativarPaciente(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// DELETAR
export async function deletarPaciente(id) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
