const BASE_URL = "http://localhost:8080/api/pacientes";

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

// CADASTRO
export async function cadastrarPaciente(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// LISTAGEM
export async function listarPacientes(psicologoId = 1) {
  const response = await fetch(`${BASE_URL}?psicologoId=${psicologoId}&ativo=true`);
  return handleResponse(response);
}