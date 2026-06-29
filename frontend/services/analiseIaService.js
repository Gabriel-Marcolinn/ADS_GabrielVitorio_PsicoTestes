import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

<<<<<<< HEAD
const BASE_URL = "https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/ia";
=======
const BASE_URL = "/api/ia";
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4

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
