import { getAuthHeaders } from "./authService.js";

const BASE_URL = "http://localhost:8080/api/usuarios";

async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    return response.json();
  }

  let mensagem = "Erro desconhecido";
  try {
    const erro = await response.json();
    mensagem =
      erro.mensagem || erro.message || erro.error || JSON.stringify(erro);
  } catch {
    mensagem = await response.text();
  }
  throw new Error(mensagem);
}

// CADASTRO
export async function cadastrarUsuario(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarUsuarios(empresaId, ativo = true) {
  const response = await fetch(
    `${BASE_URL}?empresaId=${empresaId}&ativo=${ativo}`,
    { headers: getAuthHeaders() },
  );
  return handleResponse(response);
}

export async function listarTodosUsuarios() {
  const response = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ATUALIZAR
export async function atualizarUsuario(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// INATIVAR
export async function inativarUsuario(id) {
  const response = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// DELETAR
export async function deletarUsuario(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
