import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function ModalInativarEmpresa({
  aberta,
  onFechar,
  empresa,
  onInativar,
}) {
  const [modalInativarAberta, setModalInativarAberta] = useState(false);

  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        Inativar <strong>{empresa?.razaoSocial}</strong>?
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja inativar {empresa?.razaoSocial}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Cancelar
        </Button>
        <Button onClick={onInativar} color="error" variant="contained">
          Inativar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
