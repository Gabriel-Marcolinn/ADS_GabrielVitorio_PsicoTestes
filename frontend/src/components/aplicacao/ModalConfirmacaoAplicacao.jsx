import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function ModalConfirmacaoAplicacao({
  aberta,
  onFechar,
  onConfirmar,
}) {
  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>Confirmar aplicacao</DialogTitle>
      <DialogContent>
        <Typography>Tem certeza que deseja salvar a aplicacao?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirmar}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
