import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Login.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Empresas from "./components/empresa/Empresas.jsx";
import Pacientes from "./components/paciente/Pacientes.jsx";
import Usuarios from "./components/usuario/Usuarios.jsx";
import Aplicacoes from "./components/aplicacao/Aplicacoes.jsx";
import { isAuthenticated } from "../services/authService.js";

function RotaProtegida({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },

  palette: {
    primary: {
      main: "#18a1db",
    },
    secondary: {
      main: "#2bc0ff",
    },
    background: {
      default: "#f2f7fe",
    },
  },
});

function Layout() {
  const location = useLocation();
  const semHeader = ["/login"];
  const mostrarHeader = !semHeader.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/empresas" element={<RotaProtegida><Empresas /></RotaProtegida>} />
        <Route path="/pacientes" element={<RotaProtegida><Pacientes /></RotaProtegida>} />
        <Route path="/usuarios" element={<RotaProtegida><Usuarios /></RotaProtegida>} />
        <Route path="/aplicacoes" element={<RotaProtegida><Aplicacoes /></RotaProtegida>} />
      </Routes>
    </>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
