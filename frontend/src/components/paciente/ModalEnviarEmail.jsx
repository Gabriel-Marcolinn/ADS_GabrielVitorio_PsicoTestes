import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { enviarEmailPdf } from "../../../services/aplicacaoService";

export default function ModalEnviarEmail({ aberta, onFechar, idAplicacao }) {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleConfirmar() {
    setEnviando(true);
    try {
      await enviarEmailPdf(idAplicacao, email);
    } catch (e) {
      console.error(e);
    }
    setEnviando(false);
    onFechar();
  }
  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>Enviar PDF por e-mail</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, minWidth: 350 }}>
          <TextField
            label="E-mail destinatário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirmar}
          disabled={!email || enviando}
        >
          {enviando ? "Enviando..." : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
