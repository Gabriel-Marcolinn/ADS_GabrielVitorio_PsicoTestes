import { fetchAutenticado, handleResponse } from "./apiClient";
import { getAuthHeaders } from "./authService";

const BASE_URL = "http://localhost:8080/api/dashboard";

// DASH ADMIN
export async function obterDashboardAdmin() {
  const response = await fetchAutenticado(`${BASE_URL}/admin`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
