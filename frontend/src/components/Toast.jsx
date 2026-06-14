import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast({ toast, onFechar }) {
  return (
    <Snackbar
      open={toast.aberto}
      autoHideDuration={4000}
      onClose={onFechar}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onFechar} severity={toast.tipo} variant="filled">
        {toast.mensagem}
      </Alert>
    </Snackbar>
  );
}
