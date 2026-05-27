import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUsuarioLogado, logout } from "../../services/authService.js";

const btnSx = {
  background: "#0097a7",
  color: "#fafafa",
  "&:hover": { background: "#00838f" },
};

export default function Header() {
  const navigate = useNavigate();
  const usuario = getUsuarioLogado();
  const tipo = usuario?.tipo;

  return (
    <AppBar position="static" sx={{ background: "#f5f5f5", boxShadow: "1" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1400,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #0097a7, #00bcd4)",
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PsychologyIcon sx={{ color: "#fafafa", fontSize: 32 }} />
          </Box>
          <Typography variant="h6" sx={{ color: "black", ml: "20px" }}>
            {usuario?.nome}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {tipo === "AD" && (
            <Button
              variant="contained"
              sx={btnSx}
              onClick={() => navigate("/empresas")}
            >
              Empresas
            </Button>
          )}
          {(tipo === "AD" || tipo === "PA") && (
            <Button
              variant="contained"
              sx={btnSx}
              onClick={() => navigate("/usuarios")}
            >
              Usuários
            </Button>
          )}
          {(tipo === "PA" || tipo === "PS") && (
            <Button
              variant="contained"
              sx={btnSx}
              onClick={() => navigate("/pacientes")}
            >
              Pacientes
            </Button>
          )}
          {(tipo === "PA" || tipo === "PS") && (
            <Button
              variant="contained"
              sx={btnSx}
              onClick={() => navigate("/aplicacoes")}
            >
              Aplicações
            </Button>
          )}
          <Button
            variant="contained"
            sx={btnSx}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogoutIcon sx={{ mr: 0.5 }} />
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
