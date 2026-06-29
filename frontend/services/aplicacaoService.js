import { getAuthHeaders } from "./authService.js";
import { fetchAutenticado, handleResponse } from "./apiClient.js";

<<<<<<< HEAD
const BASE_URL = "https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/aplicacoes";
=======
const BASE_URL = "/api/aplicacoes";
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4

// APLICAR TESTE
export async function aplicarTeste(data, usuarioId) {
  const response = await fetchAutenticado(BASE_URL, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Usuario-Id": usuarioId },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarAplicacoesPorPaciente(pacienteId) {
  const response = await fetchAutenticado(
    `${BASE_URL}/paciente/${pacienteId}`,
    {
      headers: getAuthHeaders(),
    },
  );
  return handleResponse(response);
}

export async function listarAplicacoesPorEmpresa(empresaId) {
  const response = await fetchAutenticado(`${BASE_URL}/empresa/${empresaId}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function listarAplicacoesPorPsicologo(psicologoId) {
  const response = await fetchAutenticado(
    `${BASE_URL}/psicologo/${psicologoId}`,
    {
      headers: getAuthHeaders(),
    },
  );
  return handleResponse(response);
}

// GERAR PDF
export async function gerarPDF(id) {
  const response = await fetchAutenticado(
<<<<<<< HEAD
    `https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/relatorios/aplicacao/${id}/simplificado`,
=======
    `/api/relatorios/aplicacao/${id}/simplificado`,
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
    { headers: getAuthHeaders() },
  );
  if (!response.ok) throw new Error("Erro ao gerar PDF");
  return response.blob();
}

export async function gerarPDFCompleto(id) {
  const response = await fetchAutenticado(
<<<<<<< HEAD
    `https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/relatorios/aplicacao/${id}/completo`,
=======
    `/api/relatorios/aplicacao/${id}/completo`,
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
    { headers: getAuthHeaders() },
  );
  if (!response.ok) throw new Error("Erro ao gerar PDF completo");
  return response.blob();
}

// ENVIAR EMAIL
export async function enviarEmailPdf(id, email) {
  const response = await fetchAutenticado(
<<<<<<< HEAD
    `https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/relatorios/aplicacao/${id}/enviar-email?emailDestinatario=${encodeURIComponent(email)}`,
=======
    `/api/relatorios/aplicacao/${id}/enviar-email?emailDestinatario=${encodeURIComponent(email)}`,
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
    {
      method: "POST",
      headers: getAuthHeaders(),
    },
  );
  if (!response.ok) throw new Error("Erro ao enviar e-mail");
  return response.text();
}

export async function enviarEmailPdfCompleto(id, email) {
  const response = await fetchAutenticado(
<<<<<<< HEAD
    `https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/relatorios/aplicacao/${id}/enviar-email-completo?emailDestinatario=${encodeURIComponent(email)}`,
=======
    `/api/relatorios/aplicacao/${id}/enviar-email-completo?emailDestinatario=${encodeURIComponent(email)}`,
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
    {
      method: "POST",
      headers: getAuthHeaders(),
    },
  );
  if (!response.ok) throw new Error("Erro ao enviar e-mail");
  return response.text();
}

// ADICIONAR LAUDO
export async function adicionarLaudo(id, laudo) {
  const response = await fetchAutenticado(`${BASE_URL}/${id}/laudo`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ laudo }),
  });
  if (!response.ok) throw new Error("Erro ao adicionar laudo");
}
