import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import ModalEnviarEmail from "./ModalEnviarEmail";

export default function ModalPdfAplicacao({
  aberta,
  onFechar,
  pdfUrl,
  idAplicacao,
}) {
  const [email, setEmail] = useState(null);
  const [modalEmailAberta, setModalEmailAberta] = useState(false);

  return (
    <>
      {modalEmailAberta && (
        <ModalEnviarEmail
          aberta={modalEmailAberta}
          onFechar={() => setModalEmailAberta(false)}
          idAplicacao={idAplicacao}
        />
      )}

      <Dialog open={aberta} onClose={onFechar} maxWidth="lg" fullWidth>
        <DialogTitle>Resultado PDF</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <iframe
            src={pdfUrl}
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModalEmailAberta(true)}>
            Enviar email
          </Button>
          <Button variant="outlined" onClick={onFechar}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
