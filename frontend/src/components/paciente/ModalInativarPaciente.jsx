import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalInativarPaciente({
  aberta,
  onFechar,
  paciente,
  onInativar,
}) {
  const acao = paciente?.ativo ? "Inativar" : "Ativar";
  const cor = paciente?.ativo ? "warning" : "success";

  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        {acao} <strong>{paciente?.nome}</strong>?
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja {acao.toLowerCase()} {paciente?.nome}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button onClick={onInativar} color={cor} variant="contained">
          {acao}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
