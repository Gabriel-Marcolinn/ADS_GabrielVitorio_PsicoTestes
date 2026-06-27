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

const TIPO_LABELS = {
  AD: { label: "Administrador" },
  PS: { label: "Psicólogo" },
  PA: { label: "Psicólogo Administrador" },
};

const NAV_LINKS = [
  { label: "Empresas", path: "/empresas", roles: ["AD"] },
  { label: "Usuários", path: "/usuarios", roles: ["AD", "PA"] },
  { label: "Pacientes", path: "/pacientes", roles: ["PA", "PS"] },
  { label: "Aplicações", path: "/aplicacoes", roles: ["PA", "PS"] },
];

export default function Header() {
  const navigate = useNavigate();
const location = useLocation();
  const usuario = getUsuarioLogado();
  const tipo = usuario?.tipo;

  const primeiraRota = NAV_LINKS.find((l) => l.roles.includes(tipo))?.path ?? "/login";

  return (
    <AppBar position="static" sx={{ background: "#f5f5f5", boxShadow: "1" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", gap: 1.5, cursor: "pointer", mr: 1 }}
          onClick={() => navigate(primeiraRota)}
        >
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
            <Typography>
              <strong>Psicotestes</strong>
            </Typography>
          </Box>
          <Typography fontWeight={700} fontSize="0.95rem" color="text.primary" letterSpacing="-0.01em">
            Psicotestes
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Navegação */}
        <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
          {NAV_LINKS.filter((link) => link.roles.includes(tipo)).map((link) => {
            const ativo = location.pathname === link.path;
            return (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                sx={{
                  color: ativo ? "primary.main" : "text.secondary",
                  fontWeight: ativo ? 700 : 500,
                  fontSize: "0.85rem",
                  backgroundColor: ativo ? "rgba(99,102,241,0.08)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(99,102,241,0.08)",
                    color: "primary.main",
                  },
                  px: 1.5,
                  py: 0.75,
                  minWidth: "auto",
                  position: "relative",
                  ...(ativo && {
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
                      height: 2,
                      backgroundColor: "primary.main",
                      borderRadius: "2px 2px 0 0",
                    },
                  }),
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>

        {/* Usuário */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" fontWeight={600} color="text.primary" lineHeight={1.3} fontSize="0.85rem">
              {usuario?.nome}
            </Typography>
            <Typography variant="h8" sx={{ color: "gray", ml: "20px" }}>
              {TIPO_LABELS[usuario?.tipo]?.label ?? "default"}
            </Typography>
          </Box>
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
