import { getAuthHeaders } from "./authService.js";

const BASE_URL = "http://localhost:8080/api/ia";

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

// ANALISE TESTE UNICO
export async function analisarTesteUnico(aplicacaoId) {
  const response = await fetch(`${BASE_URL}/teste/${aplicacaoId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Erro ao gerar analise do teste");
  return response.blob();
}

// ANALISE PACIENTE
export async function analisarPaciente(pacienteId) {
  const response = await fetch(`${BASE_URL}/paciente/${pacienteId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Erro ao gerar analise do paciente");
  return response.blob();
}
