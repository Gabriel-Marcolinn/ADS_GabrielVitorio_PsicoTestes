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
import { isAuthenticated, getUsuarioLogado } from "../services/authService.js";

const ROTA_INICIAL = {
  AD: "/empresas",
  PA: "/usuarios",
  PS: "/pacientes",
};

function RotaProtegida({ children, roles }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  const usuario = getUsuarioLogado();
  if (roles && !roles.includes(usuario?.tipo)) {
    return <Navigate to={ROTA_INICIAL[usuario?.tipo] ?? "/login"} replace />;
}
  return children;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },

  palette: {
    primary: {
      main: "#00bcd4",
      light: "#4dd0e1",
      dark: "#0097a7",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#26c6da",
    },
    background: {
      default: "#fafafa",
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
        <Route
path="/empresas"
element={
<RotaProtegida roles={["AD"]}>
<Empresas />
</RotaProtegida>
          }
/>
        <Route
path="/pacientes"
element={
<RotaProtegida roles={["PA", "PS"]}>
<Pacientes />
</RotaProtegida>
          }
/>
        <Route
path="/usuarios"
element={
<RotaProtegida roles={["AD", "PA"]}>
<Usuarios />
</RotaProtegida>
          }
/>
        <Route
path="/aplicacoes"
element={
<RotaProtegida roles={["PA", "PS"]}>
<Aplicacoes />
</RotaProtegida>
          }
/>
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
