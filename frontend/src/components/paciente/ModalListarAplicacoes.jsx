import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService";
import ModalPdfAplicacao from "./ModalPdfAplicacao";
import { gerarPDF } from "../../../services/aplicacaoService";

const TIPO_LABELS = {
  "Mínimo/Sem Depressão": { label: "Mínimo/Sem Depressão", color: "success" },
  "Depressão Leve": { label: "Depressão Leve", color: "warning" },
  "Depressão Grave": { label: "Depressão Grave", color: "error" },
};

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
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                    {a.nomeTeste}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="caption"
                        color="text.secondary"
                      >
                        Data
                      </Typography>
                      <Typography variant="body2">
                        {new Date(a.dataAplicacao).toLocaleDateString("pt-BR")}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="caption"
                        color="text.secondary"
                      >
                        Pontuação
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {a.pontuacaoTotal}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="caption"
                        color="text.secondary"
                      >
                        Resultado
                      </Typography>
                      <Box>
                        <Chip
                          label={
                            TIPO_LABELS[a.classificacao]?.label ??
                            a.classificacao
                          }
                          color={
                            TIPO_LABELS[a.classificacao]?.color ?? "default"
                          }
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handleGerarPdf(a.id)}
                >
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
