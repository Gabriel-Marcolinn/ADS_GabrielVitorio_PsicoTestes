const BASE_URL = "http://localhost:8080/api/auth";
const TOKEN_KEY = "psicotestes_token";

export async function login(email, senha) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("Email ou senha inválidos.");
  }

  const { token } = await response.json();
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}
