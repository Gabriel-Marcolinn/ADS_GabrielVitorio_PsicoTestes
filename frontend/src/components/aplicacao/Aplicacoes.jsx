import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ModalAplicarTeste from "./ModalAplicarTeste";
import Toast from "../Toast";

export default function Aplicacoes() {
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);

  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  // CADASTRAR
  async function handleCadastrar(data) {
    try {
      const novoUsuario = await cadastrarUsuario(data);
      setUsuarios([...usuarios, novoUsuario]);
      mostrarToast("Usuário cadastrado com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  return (
    <>
      <Toast toast={toast} onFechar={fecharToast} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pt: 3,
        }}
      >
        {modalCadastrarAberta && (
          <ModalAplicarTeste
            aberta={modalCadastrarAberta}
            onFechar={() => setModalCadastrarAberta(false)}
            onCadastrar={handleCadastrar}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            width: "100%",
            maxWidth: 900,
          }}
        >
          <Box>
            <Typography variant="h4">Gerenciar Aplicações</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todas as aplicações cadastradas no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalCadastrarAberta(true)}
            sx={{
              background: "linear-gradient(135deg, #0097a7, #00bcd4)",
              color: "#fafafa",
              borderRadius: 3,
              boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #00838f, #0097a7)",
                boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.6)",
              },
            }}
          >
            + Nova Aplicação
          </Button>{" "}
        </Box>
      </Box>
    </>
  );
}
