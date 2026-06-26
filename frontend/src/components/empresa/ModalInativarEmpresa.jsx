import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalInativarEmpresa({
  aberta,
  onFechar,
  empresa,
  onInativar,
}) {
  const acao = empresa?.ativo ? "Inativar" : "Ativar";
  const cor = empresa?.ativo ? "warning" : "success";
  return (
    <>
      <Dialog open={aberta} onClose={onFechar}>
        <DialogTitle>
          {acao}
          <strong>{empresa?.razaoSocial}</strong>?
        </DialogTitle>
        <DialogContent>
          Tem certeza que deseja {acao}
          {empresa?.razaoSocial}?
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
    </>
  );
}
