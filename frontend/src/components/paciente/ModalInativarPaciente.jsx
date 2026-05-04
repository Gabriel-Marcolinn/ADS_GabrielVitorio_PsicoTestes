import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalInativarPaciente({ aberta, onFechar, paciente, onInativar }) {
  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        Inativar <strong>{paciente?.nome}</strong>?
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja inativar {paciente?.nome}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button onClick={onInativar} color="warning" variant="contained">
          Inativar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
