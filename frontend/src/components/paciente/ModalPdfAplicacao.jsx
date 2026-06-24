import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import ModalEnviarEmail from "./ModalEnviarEmail";
import { gerarPDF, gerarPDFCompleto } from "../../../services/aplicacaoService";

export default function ModalPdfAplicacao({ aberta, onFechar, idAplicacao }) {
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalEmailAberta, setModalEmailAberta] = useState(false);

  useEffect(() => {
    if (!aberta) {
      setTipoRelatorio("");
      setPdfUrl(null);
    }
  }, [aberta]);

  async function handleTipoChange(e) {
    const tipo = e.target.value;
    setTipoRelatorio(tipo);
    setPdfUrl(null);
    setLoading(true);
    try {
      const blob =
        tipo === "completo"
          ? await gerarPDFCompleto(idAplicacao)
          : await gerarPDF(idAplicacao);
      setPdfUrl(URL.createObjectURL(blob));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {modalEmailAberta && (
        <ModalEnviarEmail
          aberta={modalEmailAberta}
          onFechar={() => setModalEmailAberta(false)}
          idAplicacao={idAplicacao}
          tipoRelatorio={tipoRelatorio}
        />
      )}

      <Dialog open={aberta} onClose={onFechar} maxWidth="lg" fullWidth>
        <DialogTitle>Gerar PDF</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Relatório</InputLabel>
              <Select
                value={tipoRelatorio}
                label="Tipo de Relatório"
                onChange={handleTipoChange}
              >
                <MenuItem value="simplificado">Simplificado</MenuItem>
                <MenuItem value="completo">Completo</MenuItem>
              </Select>
            </FormControl>

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {pdfUrl && (
              <>
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="800px"
                  style={{ border: "none" }}
                />
                <Button
                  variant="contained"
                  onClick={() => setModalEmailAberta(true)}
                >
                  Enviar e-mail
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onFechar}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
