import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "white", boxShadow: "1" }}>
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
              background: "linear-gradient(135deg, #1565c0, #1581c0)",
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "centere",
            }}
          >
            <PsychologyIcon sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <Typography variant="h6" sx={{ ml: "20px" }}>
            Nome do usuario
          </Typography>
        </Box>
        <Box>
          <Button onClick={() => navigate("/empresas")}>Empresas</Button>
          <Button onClick={() => navigate("/pacientes")}>Pacientes</Button>
          <Button onClick={() => navigate("/usuarios")}>Usuários</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            <LogoutIcon></LogoutIcon>Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
