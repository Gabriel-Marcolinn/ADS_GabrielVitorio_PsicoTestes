import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function ModalPdfAplicacao({ aberta, onFechar, pdfUrl }) {
  return (
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
        <Button variant="outlined" onClick={onFechar}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
