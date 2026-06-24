import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { enviarEmailPdf, enviarEmailPdfCompleto } from "../../../services/aplicacaoService";

export default function ModalEnviarEmail({ aberta, onFechar, idAplicacao, tipoRelatorio }) {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null); // { tipo: "success"|"error", mensagem: string }

  async function handleConfirmar() {
    setEnviando(true);
    setFeedback(null);
    try {
      const enviar = tipoRelatorio === "completo" ? enviarEmailPdfCompleto : enviarEmailPdf;
      await enviar(idAplicacao, email);
      setFeedback({ tipo: "success", mensagem: "E-mail enviado com sucesso!" });
    } catch (e) {
      setFeedback({ tipo: "error", mensagem: "Erro ao enviar e-mail." });
    }
    setEnviando(false);
  }

  function handleFechar() {
    setFeedback(null);
    setEmail("");
    onFechar();
  }
  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle>Enviar PDF por e-mail</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, minWidth: 350, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="E-mail destinatário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled={!!feedback?.tipo === "success"}
          />
          {feedback && (
            <Alert severity={feedback.tipo}>{feedback.mensagem}</Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleFechar}>
          {feedback ? "Fechar" : "Cancelar"}
        </Button>
        {!feedback && (
          <Button
            variant="contained"
            onClick={handleConfirmar}
            disabled={!email || enviando}
          >
            {enviando ? "Enviando..." : "Confirmar"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
