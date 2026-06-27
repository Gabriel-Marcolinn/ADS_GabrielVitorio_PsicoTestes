import { logout } from "./authService.js";

export async function fetchAutenticado(url, opcoes = {}) {
  const response = await fetch(url, opcoes);
  if (response.status === 403) {
    logout();
    window.location.replace("/login");
  }
  return response;
}

export async function handleResponse(response) {
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
