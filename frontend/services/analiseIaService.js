import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

const BASE_URL = "http://localhost:8080/api/ia";

// ANALISE TESTE UNICO
export async function analisarTesteUnico(aplicacaoId) {
  const response = await fetchAutenticado(`${BASE_URL}/teste/${aplicacaoId}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ANALISE PACIENTE
export async function analisarPaciente(pacienteId) {
  const response = await fetchAutenticado(`${BASE_URL}/paciente/${pacienteId}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
