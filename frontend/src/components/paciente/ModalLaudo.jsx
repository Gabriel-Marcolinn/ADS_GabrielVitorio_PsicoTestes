import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { useState, useEffect } from "react";
import { adicionarLaudo } from "../../../services/aplicacaoService";

export default function ModalLaudo({ aberta, onFechar, aplicacaoId, laudoInicial, onSalvar }) {
  const [laudoTexto, setLaudoTexto] = useState("");
  const [salvandoLaudo, setSalvandoLaudo] = useState(false);
  const [laudoErro, setLaudoErro] = useState(null);

  useEffect(() => {
    if (aberta) {
      setLaudoTexto(laudoInicial ?? "");
      setLaudoErro(null);
    }
  }, [aberta, laudoInicial]);

  async function handleSalvarLaudo() {
    if (!laudoTexto.trim()) {
      setLaudoErro("O texto do laudo não pode estar vazio.");
      return;
    }
    setSalvandoLaudo(true);
    setLaudoErro(null);
    try {
      await adicionarLaudo(aplicacaoId, laudoTexto);
      onSalvar(aplicacaoId, laudoTexto);
      onFechar();
    } catch (e) {
      setLaudoErro("Erro ao salvar laudo: " + e.message);
    } finally {
      setSalvandoLaudo(false);
    }
  }

  return (
    <Dialog open={aberta} onClose={onFechar} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EditDocumentIcon /> Adicionar Laudo
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          minRows={6}
          fullWidth
          label="Texto do laudo"
          value={laudoTexto}
          onChange={(e) => setLaudoTexto(e.target.value)}
          error={Boolean(laudoErro)}
          helperText={laudoErro}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar} disabled={salvandoLaudo}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSalvarLaudo} disabled={salvandoLaudo}>
          {salvandoLaudo ? <CircularProgress size={20} /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
