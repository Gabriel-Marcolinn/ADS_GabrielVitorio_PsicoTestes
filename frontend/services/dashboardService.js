import { fetchAutenticado, handleResponse } from "./apiClient";
import { getAuthHeaders } from "./authService";

const BASE_URL = "/api/dashboard";

// DASH ADMIN
export async function obterDashboardAdmin() {
  const response = await fetchAutenticado(`${BASE_URL}/admin`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// DASH PSICO ADMIN
export async function obterDashboardPsicologoAdmin(empresaId) {
  const response = await fetchAutenticado(
    `${BASE_URL}/psicologoadmin/${empresaId}`,
    {
      headers: getAuthHeaders(),
    },
  );
  return handleResponse(response);
}
