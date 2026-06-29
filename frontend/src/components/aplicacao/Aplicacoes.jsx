import { useEffect, useState } from "react";
import {
  listarAplicacoesPorEmpresa,
  listarAplicacoesPorPsicologo,
} from "../../../services/aplicacaoService";
import { listarUsuarios } from "../../../services/usuarioService";
import { listarPacientesPorEmpresa } from "../../../services/pacienteService";
import { getUsuarioLogado } from "../../../services/authService";
import { analisarTesteUnico } from "../../../services/analiseIaService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArticleIcon from "@mui/icons-material/Article";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import ModalAplicarTeste from "./ModalAplicarTeste";
import ModalPdfAplicacao from "../paciente/ModalPdfAplicacao";
import ModalListarAlternativas from "../paciente/ModalListarAlternativas";
import ModalLaudo from "../paciente/ModalLaudo";
import Toast from "../Toast";

const TIPO_LABELS = {
  //BDI-DOIS
  Mínimo: { label: "Mínimo", color: "success" },
  Leve: { label: "Leve", color: "secondary" },
  Moderado: { label: "Moderado", color: "warning" },
  Severo: { label: "Severo", color: "error" },

  //BSS
  "Risco Baixo": { label: "Risco Baixo", color: "success" },
  "Risco Moderado": { label: "Risco Moderado", color: "warning" },
  "Risco Alto": { label: "Risco Alto", color: "error" },

  //WHO
  "Boa qualidade de vida": { label: "Boa qualidade de vida", color: "success" },
  "Qualidade de vida moderada": {
    label: "Qualidade de vida moderada",
    color: "warning",
  },
  "Baixa qualidade de vida": {
    label: "Baixa qualidade de vida",
    color: "error",
  },
};

export default function Aplicacoes() {
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);
  const [aplicacoes, setAplicacoes] = useState([]);
  const [menuAncora, setMenuAncora] = useState(null);
  const [menuAplicacao, setMenuAplicacao] = useState(null);
  const [modalPdfAberta, setModalPdfAberta] = useState(false);
  const [modalAlternativasAberta, setModalAlternativasAberta] = useState(false);
  const [aplicacaoDetalhesId, setAplicacaoDetalhesId] = useState(null);
  const [laudoDialogAberta, setLaudoDialogAberta] = useState(false);
  const [laudoAplicacaoId, setLaudoAplicacaoId] = useState(null);
  const [analiseIaAberta, setAnaliseIaAberta] = useState(false);
  const [loadingAnalise, setLoadingAnalise] = useState(false);
  const [analiseIa, setAnaliseIa] = useState(null);

  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  const [psicologos, setPsicologos] = useState([]);
  const [pacientePsicologoMap, setPacientePsicologoMap] = useState({});
  const psicologoMap = Object.fromEntries(psicologos.map((p) => [p.id, p.nome]));

  const usuario = getUsuarioLogado();
  const isPA = usuario?.tipo === "PA";

  async function carregarAplicacoes() {
    try {
      const lista = isPA
        ? await listarAplicacoesPorEmpresa(usuario.empresaId)
        : await listarAplicacoesPorPsicologo(usuario.id);
      setAplicacoes(lista);
    } catch (e) {
      mostrarToast("Erro ao carregar aplicações.", "error");
    }
  }

  useEffect(() => {
    carregarAplicacoes();
  }, []);

  useEffect(() => {
    if (!isPA) return;
    async function carregarDadosPA() {
      try {
        const [ativos, inativos, usuarios] = await Promise.all([
          listarPacientesPorEmpresa(usuario.empresaId, true),
          listarPacientesPorEmpresa(usuario.empresaId, false),
          listarUsuarios(usuario.empresaId, true),
        ]);
        setPacientePsicologoMap(
          Object.fromEntries(
            [...ativos, ...inativos].map((p) => [p.id, p.psicologoId]),
          ),
        );
        setPsicologos(usuarios.filter((u) => u.tipo === "PS"));
      } catch {
        // não crítico
      }
    }
    carregarDadosPA();
  }, []);

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

  function handleLaudoSalvo(id, texto) {
    setAplicacoes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, laudo: texto } : a)),
    );
  }

  function handleFecharModal() {
    setModalCadastrarAberta(false);
    carregarAplicacoes();
  }

  return (
    <>
      <Toast toast={toast} onFechar={fecharToast} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pt: 3,
        }}
      >
        {modalCadastrarAberta && (
          <ModalAplicarTeste
            aberta={modalCadastrarAberta}
            onFechar={handleFecharModal}
          />
        )}

        {/* TITULO E BOTAO */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            width: "100%",
            maxWidth: 900,
          }}
        >
          <Box>
            <Typography variant="h4">Gerenciar Aplicações</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todas as aplicações cadastradas no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalCadastrarAberta(true)}
          >
            + Nova Aplicação
          </Button>
        </Box>

        {/* LISTAGEM */}
        <TableContainer component={Paper} sx={{ maxWidth: "90%", borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Paciente</strong>
                </TableCell>
                <TableCell>
                  <strong>Teste</strong>
                </TableCell>
                <TableCell>
                  <strong>Data</strong>
                </TableCell>
                <TableCell>
                  <strong>Pontuação</strong>
                </TableCell>
                <TableCell>
                  <strong>Resultado</strong>
                </TableCell>
                {isPA && (
                  <TableCell>
                    <strong>Psicólogo</strong>
                  </TableCell>
                )}
                <TableCell>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aplicacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isPA ? 7 : 6} align="center" sx={{ p: 8 }}>
                    <Box sx={{ m: 2 }}>
                      <Typography variant="h4">
                        Nenhuma aplicação encontrada!
                      </Typography>
                      <Typography variant="h6">
                        Vamos registrar a primeira aplicação?
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => setModalCadastrarAberta(true)}
                      sx={{ m: 2 }}
                    >
                      Nova Aplicação
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                aplicacoes.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.nomePaciente}</TableCell>
                    <TableCell>{a.nomeTeste}</TableCell>
                    <TableCell>
                      {new Date(a.dataAplicacao).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{a.pontuacaoTotal}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          TIPO_LABELS[a.classificacao]?.label ?? a.classificacao
                        }
                        color={
                          TIPO_LABELS[a.classificacao]?.color ?? "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    {isPA && (
                      <TableCell>
                        {psicologoMap[pacientePsicologoMap[a.pacienteId]] ?? "—"}
                      </TableCell>
                    )}
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          setMenuAncora(e.currentTarget);
                          setMenuAplicacao(a);
                        }}
                        sx={{
                          background: "#EEF2FF",
                          color: "#6366F1",
                          "&:hover": { background: "#E0E7FF" },
                        }}
                      >
                        <FormatListBulletedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ANALISE IA */}
        <Dialog
          open={analiseIaAberta}
          onClose={() => setAnaliseIaAberta(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SmartToyIcon /> Análise IA
          </DialogTitle>
          <DialogContent
            sx={{ border: "solid gray 2px", mr: 1, ml: 1, borderRadius: 3 }}
          >
            {loadingAnalise ? (
              <Typography color="text.secondary" sx={{ m: 1 }}>
                Gerando análise...
              </Typography>
            ) : (
              <Typography sx={{ whiteSpace: "pre-wrap", m: 1 }}>
                {analiseIa}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setAnaliseIaAberta(false)}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {modalPdfAberta && (
        <ModalPdfAplicacao
          aberta={modalPdfAberta}
          onFechar={() => setModalPdfAberta(false)}
          idAplicacao={menuAplicacao?.id}
        />
      )}

      {modalAlternativasAberta && (
        <ModalListarAlternativas
          aberta={modalAlternativasAberta}
          onFechar={() => setModalAlternativasAberta(false)}
          aplicacaoId={aplicacaoDetalhesId}
        />
      )}

      {laudoDialogAberta && (
        <ModalLaudo
          aberta={laudoDialogAberta}
          onFechar={() => setLaudoDialogAberta(false)}
          aplicacaoId={laudoAplicacaoId}
          laudoInicial={menuAplicacao?.laudo}
          onSalvar={handleLaudoSalvo}
        />
      )}

      <Menu
        anchorEl={menuAncora}
        open={Boolean(menuAncora)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setMenuAncora(null)}
      >
        <MenuItem
          onClick={() => {
            setMenuAncora(null);
            setModalPdfAberta(true);
          }}
        >
          <ArticleIcon fontSize="small" sx={{ mr: 1 }} /> Gerar PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAplicacaoDetalhesId(menuAplicacao?.id);
            setModalAlternativasAberta(true);
            setMenuAncora(null);
          }}
        >
          <ContentPasteSearchIcon fontSize="small" sx={{ mr: 1 }} /> Detalhes
        </MenuItem>
        <MenuItem onClick={() => gerarAnaliseIaAplicacao(menuAplicacao?.id)}>
          <SmartToyIcon fontSize="small" sx={{ mr: 1 }} /> Análise IA
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLaudoAplicacaoId(menuAplicacao?.id);
            setLaudoDialogAberta(true);
            setMenuAncora(null);
          }}
        >
          <EditDocumentIcon fontSize="small" sx={{ mr: 1 }} /> Adicionar laudo
        </MenuItem>
      </Menu>
    </>
  );
}
