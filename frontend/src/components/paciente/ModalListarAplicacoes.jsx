import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService";
import ModalPdfAplicacao from "./ModalPdfAplicacao";
import { gerarPDF } from "../../../services/aplicacaoService";

export default function ModalListarAplicacoes({ aberta, onFechar, paciente }) {
  const [aplicacoes, setAplicacoes] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalPdfAplicacaoAberta, setModalPdfAplicacaoAberta] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [aplicacaoSelecionadaId, setAplicacaoSelecionadaId] = useState(null);

  useEffect(() => {
    if (aberta && paciente) {
      fetch(`http://localhost:8080/api/aplicacoes/paciente/${paciente.id}`, {
        headers: getAuthHeaders(),
      })
        .then((r) => r.json())
        .then(setAplicacoes)
        .catch(console.error);
    }
  }, [aberta, paciente]);

  async function handleGerarPdf(id) {
    const blob = await gerarPDF(id);
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setModalPdfAplicacaoAberta(true);
    setAplicacaoSelecionadaId(id);
  }

  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        Aplicacoes de <strong>{paciente?.nome}</strong>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 1,
            minWidth: 400,
          }}
        >
          {aplicacoes.length === 0 ? (
            <Typography color="text.secondary">
              Nenhuma aplicacao encontrada
            </Typography>
          ) : (
            aplicacoes.map((a) => (
              <Box
                key={a.id}
                sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}
              >
                <Typography fontWeight="bold">{a.nomeTeste}</Typography>
                <Typography varian="body2">
                  Pontuacao: {a.pontuacaoTotal}
                </Typography>
                <Typography varian="body2">
                  Classificacao: {a.classificacao}
                </Typography>
                <Typography varian="body2" color="text.secondary">
                  Data Aplicacao:{" "}
                  {new Date(a.dataAplicacao).toLocaleDateString("pt-BR")}
                </Typography>
                <Button variant="outlined" onClick={() => handleGerarPdf(a.id)}>
                  Gerar PDF
                </Button>
              </Box>
            ))
          )}
        </Box>

        {modalPdfAplicacaoAberta && (
          <ModalPdfAplicacao
            aberta={modalPdfAplicacaoAberta}
            onFechar={() => setModalPdfAplicacaoAberta(false)}
            pdfUrl={pdfUrl}
            idAplicacao={aplicacaoSelecionadaId}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
