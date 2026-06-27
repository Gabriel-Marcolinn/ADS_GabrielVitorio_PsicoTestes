import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUsuarioLogado, logout } from "../../services/authService.js";

const TIPO_LABELS = {
  AD: "Administrador",
  PS: "Psicólogo",
  PA: "Psicólogo Administrador",
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
    <AppBar position="static">
      <Toolbar sx={{ maxWidth: 1400, width: "100%", mx: "auto", gap: 1, minHeight: "60px !important" }}>
        {/* Logo */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer", mr: 1 }}
          onClick={() => navigate(primeiraRota)}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #4F46E5, #6366F1)",
              borderRadius: "10px",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PsychologyIcon sx={{ color: "#fff", fontSize: 20 }} />
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
            <Typography variant="caption" color="text.secondary" lineHeight={1.2} fontSize="0.7rem">
              {TIPO_LABELS[tipo]}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <IconButton
            onClick={() => { logout(); navigate("/login"); }}
            size="small"
            title="Sair"
            sx={{
              color: "text.secondary",
              borderRadius: "8px",
              "&:hover": {
                color: "error.main",
                backgroundColor: "rgba(239,68,68,0.08)",
              },
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
