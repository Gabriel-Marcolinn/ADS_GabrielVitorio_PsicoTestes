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
import DashboardAdmin from "./components/DashboardAdmin.jsx";

const ROTA_INICIAL = {
  AD: "/dashboard-admin",
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
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600 },
  },
  palette: {
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: { main: "#8B5CF6" },
    success: { main: "#10B981", contrastText: "#ffffff" },
    warning: { main: "#F59E0B", contrastText: "#ffffff" },
    error: { main: "#EF4444", contrastText: "#ffffff" },
    background: { default: "#F1F5F9", paper: "#ffffff" },
    text: { primary: "#0F172A", secondary: "#64748B" },
    divider: "#E2E8F0",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          fontSize: "0.875rem",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#4F46E5",
            boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
          },
        },
        outlined: {
          borderColor: "#CBD5E1",
          "&:hover": {
            borderColor: "#6366F1",
            backgroundColor: "rgba(99,102,241,0.04)",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#EEF2FF",
          color: "#4338CA",
          fontWeight: 700,
          fontSize: "0.72rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          borderBottom: "2px solid #C7D2FE",
          padding: "12px 16px",
        },
        body: {
          color: "#334155",
          borderBottom: "1px solid #F1F5F9",
          padding: "13px 16px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "#F8FAFC" },
          "&:last-child td, &:last-child th": { border: 0 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid #E2E8F0",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: "1.1rem", padding: "20px 24px 8px" },
      },
    },
    MuiDialogContent: {
      styleOverrides: { root: { padding: "12px 24px 16px" } },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: "8px 24px 20px", gap: "8px" } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#94A3B8",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6366F1",
            borderWidth: "2px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#64748B",
          fontSize: "0.9rem",
          "&.Mui-focused": { color: "#6366F1" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "0.7rem", borderRadius: "6px" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          margin: "1px 4px",
          fontSize: "0.875rem",
          padding: "7px 10px",
          "&:hover": { backgroundColor: "#EEF2FF" },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          boxShadow:
            "0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          padding: "4px",
          "& .MuiList-root": { padding: "0" },
        },
      },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: "8px" } },
    },
    MuiSelect: {
      styleOverrides: { outlined: { borderRadius: "8px" } },
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
        <Route
          path="/dashboard-admin"
          element={
            <RotaProtegida>
              <DashboardAdmin />
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
