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
import ModalListarAlternativas from "./ModalListarAlternativas";
import { analisarTesteUnico } from "../../../services/analiseIaService";
import IconButton from "@mui/material/IconButton";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArticleIcon from "@mui/icons-material/Article";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const TIPO_LABELS = {
  //BDI-DOIS
  "Mínimo/Sem Depressão": { label: "Mínimo/Sem Depressão", color: "success" },
  "Depressão Leve": { label: "Depressão Leve", color: "secondary" },
  "Depressão Moderada": { label: "Depressão Moderada", color: "warning" },
  "Depressão Grave": { label: "Depressão Grave", color: "error" },

  //BSS
  "Poucos sinais de risco suicida.": {
    label: "Poucos sinais de risco suicida.",
    color: "success",
  },
  "Pensamentos suicidas ou sofrimento importante.": {
    label: "Pensamentos suicidas ou sofrimento importante.",
    color: "warning",
  },
  "Risco elevado de tentativa suicida.": {
    label: "Risco elevado de tentativa suicida.",
    color: "error",
  },

  //WHO
  "Satisfatória (Qualidade de vida boa)": {
    label: "Qualidade de vida indicativa satisfatória",
    color: "success",
  },
  "Regular (Qualidade de vida moderada)": {
    label: "Qualidade de vida indicativa regular",
    color: "warning",
  },
  "Qualidade de vida indicativa baixa": {
    label: "Qualidade de vida indicativa baixa",
    color: "error",
  },
};

export default function ModalListarAplicacoes({ aberta, onFechar, paciente }) {
  const [aplicacoes, setAplicacoes] = useState([]);
  const [modalPdfAplicacaoAberta, setModalPdfAplicacaoAberta] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [aplicacaoSelecionadaId, setAplicacaoSelecionadaId] = useState(null);
  const [modalAlternativasAberta, setModalAlternativasAberta] = useState(false);
  const [aplicacaoDetalhesId, setAplicacaoDetalhesId] = useState(null);
  const [menuAncora, setMenuAncora] = useState(null);
  const [menuAplicacao, setMenuAplicacao] = useState(null);
  const [analiseIa, setAnaliseIa] = useState(null);
  const [analiseIaAberta, setAnaliseIaAberta] = useState(false);
  const [loadingAnalise, setLoadingAnalise] = useState(false);

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

  function handleGerarPdf(id) {
    setAplicacaoSelecionadaId(id);
    setMenuAncora(null);
    setModalPdfAplicacaoAberta(true);
  }

  async function gerarAnaliseIaAplicacao(id) {
    setMenuAncora(null);
    setLoadingAnalise(true);
    setAnaliseIaAberta(true);
    setAnaliseIa(null);
    try {
      const data = await analisarTesteUnico(id);
      setAnaliseIa(data.analise);
    } catch (e) {
      setAnaliseIa("Erro ao gerar análise: " + e.message);
    } finally {
      setLoadingAnalise(false);
    }
  }

  async function handleAbrirAcoes(event, aplicacao) {
    setMenuAncora(event);
    setMenuAplicacao(aplicacao);
  }

  return (
    <>
      <Dialog open={aberta} onClose={onFechar} maxWidth="xl">
        <DialogTitle>
          Aplicações de <strong>{paciente?.nome}</strong>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
              minWidth: 600,
            }}
          >
            {aplicacoes.length === 0 ? (
              <Typography color="text.secondary">
                Nenhuma aplicação encontrada
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
                          {new Date(a.dataAplicacao).toLocaleDateString(
                            "pt-BR",
                          )}
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

                  <IconButton
                    onClick={(e) => handleAbrirAcoes(e.currentTarget, a)}
                    sx={{ p: 1, background: "#dddcdc", borderRadius: 2 }}
                  >
                    <FormatListBulletedIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          {modalAlternativasAberta && (
            <ModalListarAlternativas
              aberta={modalAlternativasAberta}
              onFechar={() => setModalAlternativasAberta(false)}
              aplicacaoId={aplicacaoDetalhesId}
            />
          )}

          {modalPdfAplicacaoAberta && (
            <ModalPdfAplicacao
              aberta={modalPdfAplicacaoAberta}
              onFechar={() => setModalPdfAplicacaoAberta(false)}
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

      <Dialog
        open={analiseIaAberta}
        onClose={() => setAnaliseIaAberta(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SmartToyIcon /> Análise IA
        </DialogTitle>
        <DialogContent             sx={{ border: "solid gray 2px", mr: 1, ml: 1, borderRadius: 3 }}
>
          {loadingAnalise ? (
            <Typography color="text.secondary" sx={{ m: 1 }}>Gerando análise...</Typography>
          ) : (
            <Typography sx={{ whiteSpace: "pre-wrap", m: 1 }}>{analiseIa}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setAnaliseIaAberta(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAncora}
        open={Boolean(menuAncora)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setMenuAncora(null)}
      >
        <MenuItem
          onClick={() => {
            handleGerarPdf(menuAplicacao?.id);
          }}
        >
          <ArticleIcon fontSize="small" sx={{ mr: 1 }} /> Gerar PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAplicacaoDetalhesId(menuAplicacao?.id);
            setModalAlternativasAberta(true);
          }}
        >
          <ContentPasteSearchIcon fontSize="small" sx={{ mr: 1 }} /> Detalhes
        </MenuItem>
        <MenuItem onClick={() => gerarAnaliseIaAplicacao(menuAplicacao?.id)}>
          <SmartToyIcon fontSize="small" sx={{ mr: 1 }} /> Análise IA
        </MenuItem>
      </Menu>
    </>
  );
}
