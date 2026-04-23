import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PsychologyIcon from '@mui/icons-material/Psychology';import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "white", boxShadow: "1" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #1565c0, #42a5f5)",
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

        <Button color="inherit" onClick={() => navigate("/login")}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
