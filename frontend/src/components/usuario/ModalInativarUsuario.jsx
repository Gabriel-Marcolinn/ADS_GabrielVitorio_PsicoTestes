import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalInativarUsuario({
  aberta,
  onFechar,
  usuario,
  onInativar,
}) {
  const acao = usuario?.ativo ? "Inativar" : "Ativar";
  const cor = usuario?.ativo ? "warning" : "success";

  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        {acao} <strong>{usuario?.nome}</strong>?
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja {acao}
        {usuario?.nome}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button
          onClick={onInativar}
          color={cor}
          variant="contained"
        >
          {acao}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
