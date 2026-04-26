import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Empresas.jsx";
import Login from "./Login.jsx";
import Empresas from "./Empresas.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header.jsx";
import CssBaseline from "@mui/material/CssBaseline";

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
        <Route path="/empresas" element={<Empresas />} />
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
