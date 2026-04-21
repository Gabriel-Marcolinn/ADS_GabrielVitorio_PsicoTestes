import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:windi.css";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Empresas from "./Empresas.jsx";
import EmpresaCadastro from "./EmpresaCadastro.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "virtual:windi.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#18a1db",
    },
    secondary: {
      main: "#2bc0ff",
    },
    background: {
      default: "#d7dbdb",
    },
  },
});

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect assim que abre a url */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/empresas/cadastro" element={<EmpresaCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
