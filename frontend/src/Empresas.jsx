import { useEffect, useState } from "react";
import { deletarEmpresa, listarEmpresas } from "../services/empresaService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [empresaParaDeletar, setEmpresaParaDeletar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

  function confirmarDeletar(empresa) {
    setEmpresaParaDeletar(empresa);
    setModalAberta(true);
  }

  async function handleDeletar() {
    try {
      await deletarEmpresa(empresaParaDeletar.id);
      setEmpresas(empresas.filter((e) => e.id !== empresaParaDeletar.id));
      setModalAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

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
      <Dialog open={modalAberta} onClose={() => setModalAberta(false)}>
        <DialogTitle>
          Deletar <strong>{empresaParaDeletar?.razaoSocial}</strong>?
        </DialogTitle>
        <DialogContent>
          Tem certeza que deseja deletar {empresaParaDeletar?.razaoSocial}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAberta(false)}>Cancelar</Button>
          <Button onClick={handleDeletar} coloar="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
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
          Empresas cadastradas:
        </Typography>

        <Button variant="contained" onClick={() => navigate("./cadastro")}>
          Cadastrar empresa
        </Button>
      </Box>
      <Paper elevation={4} sx={{ p: 2, width: 600, borderRadius: 3 }}>
        {empresas.map((empresa) => (
          <Box
            sx={{
              outline: "2px solid grey",
              borderRadius: 2,
              mb: "8px",
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <p key={empresa.id}>
              {empresa.razaoSocial} - {empresa.cnpj}
            </p>
            <Box>
              <Button
                variant="outlined"
                color="error"
                sx={{ mr: "2px" }}
                onClick={() => confirmarDeletar(empresa)}
              >
                Deletar
              </Button>
              <Button variant="outlined" color="primary" sx={{ mr: "2px" }}>
                Editar
              </Button>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
