import { getAuthHeaders } from "./authService.js";

const BASE_URL = "http://localhost:8080/api/aplicacoes";

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

// APLICAR TESTE
export async function aplicarTeste(data, usuarioId) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Usuario-Id": usuarioId },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM DE UM PACIENTE
export async function listarAplicacoesPorPaciente(pacienteId) {
  const response = await fetch(`${BASE_URL}/paciente/${pacienteId}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
