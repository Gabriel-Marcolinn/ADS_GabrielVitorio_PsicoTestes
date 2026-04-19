import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:windi.css";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Empresas from "./Empresas.jsx";
import "virtual:windi.css";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect assim que abre a url */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/empresas" element={<Empresas />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
