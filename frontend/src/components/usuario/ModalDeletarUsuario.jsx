import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalDeletarUsuario({ aberta, onFechar, usuario, onDeletar }) {
  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        Deletar <strong>{usuario?.nome}</strong>?
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja deletar {usuario?.nome}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button onClick={onDeletar} color="error" variant="contained">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
