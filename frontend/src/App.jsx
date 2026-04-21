import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function App() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Você está logado! Bem vindo ao app.
        </Typography>
        <Paper elevation={4} sx={{ p: 2, width: 600, borderRadius: 3 }}>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              mb: 2,
            }}
            variant="h5"
            fontWeight="bold"
          >
            Opcoes:
          </Typography>
          <Button variant="contained" onClick={() => navigate("/empresas")}>
            Empresas
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
