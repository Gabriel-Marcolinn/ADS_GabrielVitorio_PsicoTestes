import { useEffect, useState } from "react";
import { listarEmpresas } from "../services/empresaService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Empresas cadastradas:{" "}
        </Typography>

        <Button variant="contained" onClick={() => navigate("./cadastro")}>
          Cadastrar empresa
        </Button>
      </Box>
      <Paper elevation={4} sx={{ p: 2, width: 600, borderRadius: 3 }}>
        {empresas.map((empresa) => (
          <p key={empresa.id}>
            {empresa.razaoSocial} - {empresa.cnpj}
          </p>
        ))}
      </Paper>
    </Box>
  );
}
