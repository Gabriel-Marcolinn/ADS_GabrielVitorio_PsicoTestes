import { useEffect, useState } from "react";
import {
  cadastrarPaciente,
  listarPacientes,
  atualizarPaciente,
  inativarPaciente,
  deletarPaciente,
} from "../../../services/pacienteService";
import {
  listarUsuarios,
  listarTodosUsuarios,
} from "../../../services/usuarioService";
import { getUsuarioLogado } from "../../../services/authService";
import { mask } from "validation-br/dist/cpf";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { isEmpty } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalCadastrarPaciente from "./ModalCadastrarPaciente";
import ModalEditarPaciente from "./ModalEditarPaciente";
import ModalDeletarPaciente from "./ModalDeletarPaciente";
import ModalInativarPaciente from "./ModalInativarPaciente";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ModalListarAplicacoes from "./ModalListarAplicacoes";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Toast from "../Toast";
import { isCPF } from "validation-br";
import { analisarPaciente } from "../../../services/analiseIaService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [psicologos, setPsicologos] = useState([]);
  const [psicologoFiltro, setPsicologoFiltro] = useState("");
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);
  const [modalEditarAberta, setModalEditarAberta] = useState(false);
  const [pacienteParaEditar, setPacienteParaEditar] = useState(null);
  const [modalDeletarAberta, setModalDeletarAberta] = useState(false);
  const [pacienteParaDeletar, setPacienteParaDeletar] = useState(null);
  const [modalInativarAberta, setModalInativarAberta] = useState(false);
  const [pacienteParaInativar, setPacienteParaInativar] = useState(null);
  const [modalAplicacoesAberta, setModalAplicacoesAberta] = useState(false);
  const [pacienteParaAplicacoes, setPacienteParaAplicacoes] = useState(null);
  const [ativosTrue, setAtivosTrue] = useState(true);
  const [buscaNome, setBuscaNome] = useState("");
  const [menuAncora, setMenuAncora] = useState(null);
  const [menuPaciente, setMenuPaciente] = useState(null);
  const [analiseIaAberta, setAnaliseIaAberta] = useState(false);
  const [loadingAnalise, setLoadingAnalise] = useState(false);
  const [analiseIa, setAnaliseIa] = useState(null);

  const usuarioLogado = getUsuarioLogado();
  const tipo = usuarioLogado?.tipo;
  const isPS = tipo === "PS";
  const isPA = tipo === "PA";

  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  useEffect(() => {
    if (isPS) {
      setPsicologoFiltro(usuarioLogado?.id);
    } else if (isPA) {
      listarUsuarios(usuarioLogado?.empresaId, true)
        .then((lista) => {
          const ps = lista.filter((u) => u.tipo === "PS");
          setPsicologos(ps);
          if (ps.length > 0) setPsicologoFiltro(ps[0].id);
        })
        .catch(console.error);
    } else {
      listarTodosUsuarios()
        .then((lista) => {
          const ps = lista.filter((u) => u.tipo === "PS" && u.ativo);
          setPsicologos(ps);
          if (ps.length > 0) setPsicologoFiltro(ps[0].id);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!psicologoFiltro) {
      setPacientes([]);
      return;
    }
    listarPacientes(psicologoFiltro, ativosTrue)
      .then(setPacientes)
      .catch(console.error);
  }, [psicologoFiltro, ativosTrue]);

  // ANALISE IA PACIENTE
  async function gerarAnaliseIaPaciente(id) {
    setMenuAncora(null);
    setLoadingAnalise(true);
    setAnaliseIaAberta(true);
    setAnaliseIa(null);
    try {
      const data = await analisarPaciente(id);
      setAnaliseIa(data.analise);
    } catch (e) {
      setAnaliseIa("Erro ao gerar análise: " + e.message);
    } finally {
      setLoadingAnalise(false);
    }
  }

  // CADASTRAR
  async function handleCadastrar(data) {
    try {
      const novoPaciente = await cadastrarPaciente({
        ...data,
        psicologoId: Number(data.usuarioId),
      });
      setPacientes([...pacientes, novoPaciente]);
      mostrarToast("Paciente cadastrado com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  // EDITAR
  function abrirEditar(paciente) {
    setPacienteParaEditar(paciente);
    setModalEditarAberta(true);
  }

  async function handleEditar(data) {
    try {
      await atualizarPaciente(pacienteParaEditar.id, {
        ...data,
        psicologoId: Number(data.usuarioId),
      });
      setPacientes(
        pacientes.map((p) =>
          p.id === pacienteParaEditar.id ? { ...p, ...data } : p,
        ),
      );
      setModalEditarAberta(false);
      mostrarToast("Paciente editado com sucesso!");
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  // DELETAR
  function confirmarDeletar(paciente) {
    setPacienteParaDeletar(paciente);
    setModalDeletarAberta(true);
  }

  async function handleDeletar() {
    try {
      await deletarPaciente(pacienteParaDeletar.id);
      setPacientes(pacientes.filter((p) => p.id !== pacienteParaDeletar.id));
      setModalDeletarAberta(false);
      mostrarToast("Paciente deletado com sucesso!");
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  // INATIVAR
  function confirmarInativar(paciente) {
    setPacienteParaInativar(paciente);
    setModalInativarAberta(true);
  }

  async function handleInativar() {
    try {
      await inativarPaciente(pacienteParaInativar.id);
      setPacientes(pacientes.filter((p) => p.id !== pacienteParaInativar.id));
      setModalInativarAberta(false);
      mostrarToast(
        pacienteParaInativar.ativo
          ? "Paciente inativado com sucesso!"
          : "Paciente ativado com sucesso!",
      );
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  async function handleAbrirAcoes(event, paciente) {
    setMenuAncora(event);
    setMenuPaciente(paciente);
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
          <ModalCadastrarPaciente
            aberta={modalCadastrarAberta}
            onFechar={() => setModalCadastrarAberta(false)}
            onCadastrar={handleCadastrar}
          />
        )}

        {modalEditarAberta && (
          <ModalEditarPaciente
            aberta={modalEditarAberta}
            onFechar={() => setModalEditarAberta(false)}
            paciente={pacienteParaEditar}
            onEditar={handleEditar}
          />
        )}

        {modalDeletarAberta && (
          <ModalDeletarPaciente
            aberta={modalDeletarAberta}
            onFechar={() => setModalDeletarAberta(false)}
            paciente={pacienteParaDeletar}
            onDeletar={handleDeletar}
          />
        )}

        {modalInativarAberta && (
          <ModalInativarPaciente
            aberta={modalInativarAberta}
            onFechar={() => setModalInativarAberta(false)}
            paciente={pacienteParaInativar}
            onInativar={handleInativar}
          />
        )}

        {modalAplicacoesAberta && (
          <ModalListarAplicacoes
            aberta={modalAplicacoesAberta}
            onFechar={() => setModalAplicacoesAberta(false)}
            paciente={pacienteParaAplicacoes}
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
            <Typography variant="h4">Gerenciar Pacientes</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todos os pacientes cadastrados no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalCadastrarAberta(true)}
          >
            + Novo Paciente
          </Button>
        </Box>

        {/* FILTROS */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: "75%",
            mb: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Buscar por nome..."
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Select
            value={ativosTrue}
            onChange={(e) => setAtivosTrue(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value={true}>Ativos</MenuItem>
            <MenuItem value={false}>Inativos</MenuItem>
          </Select>

          {!isPS && (
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Psicólogo</InputLabel>
              <Select
                value={psicologoFiltro}
                label="Psicólogo"
                onChange={(e) => setPsicologoFiltro(e.target.value)}
              >
                {psicologos.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* LISTAGEM */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "75%", borderRadius: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nome</strong>
                </TableCell>
                <TableCell>
                  <strong>CPF</strong>
                </TableCell>
                <TableCell>
                  <strong>E-mail</strong>
                </TableCell>
                <TableCell>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pacientes.filter((p) =>
                p.nome.toLowerCase().includes(buscaNome.toLowerCase()),
              ).length === 0 ? (
                ativosTrue ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ p: 8 }}>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="h4">
                          Nenhum paciente encontrado!
                        </Typography>
                        <Typography variant="h6">
                          Vamos cadastrar o seu primeiro paciente?
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={() => setModalCadastrarAberta(true)}
                        sx={{ m: 2 }}
                      >
                        Novo Paciente
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ p: 8 }}>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="h4">
                          Nenhum paciente encontrado!
                        </Typography>
                        <Typography variant="h6">
                          Tente filtrar pelos ativos
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => setAtivosTrue(true)}
                        sx={{ m: 2 }}
                      >
                        Filtrar por ativos
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                pacientes
                  .filter((p) =>
                    p.nome.toLowerCase().includes(buscaNome.toLowerCase()),
                  )
                  .map((paciente) => (
                    <TableRow key={paciente.id}>
                      <TableCell sx={{ width: "25%" }}>
                        {paciente.nome}
                      </TableCell>
                      <TableCell sx={{ width: "20%" }}>
                        {mask(paciente.cpf)}
                      </TableCell>
                      <TableCell sx={{ width: "45%" }}>
                        {paciente.email}
                      </TableCell>
                      <TableCell sx={{ width: "10%" }}>
                        <IconButton
                          onClick={(e) =>
                            handleAbrirAcoes(e.currentTarget, paciente)
                          }
                          sx={{ background: "#EEF2FF", color: "#6366F1", "&:hover": { background: "#E0E7FF" } }}
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

        <Menu
          anchorEl={menuAncora}
          open={Boolean(menuAncora)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => setMenuAncora(null)}
        >
          <MenuItem
            onClick={() => {
              abrirEditar(menuPaciente);
              setMenuAncora(null);
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarDeletar(menuPaciente);
              setMenuAncora(null);
            }}
          >
            <DeleteIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Deletar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarInativar(menuPaciente);
              setMenuAncora(null);
            }}
          >
            {menuPaciente?.ativo ? (
              <>
                <BlockIcon fontSize="small" color="warning" sx={{ mr: 1 }} />{" "}
                Inativar
              </>
            ) : (
              <>
                <CheckCircleOutlinedIcon
                  fontSize="small"
                  color="success"
                  sx={{ mr: 1 }}
                />{" "}
                Ativar
              </>
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setPacienteParaAplicacoes(menuPaciente);
              setModalAplicacoesAberta(true);
              setMenuAncora(null);
            }}
          >
            <FindInPageIcon fontSize="small" sx={{ mr: 1 }} /> Ver aplicações
          </MenuItem>
          <MenuItem onClick={() => gerarAnaliseIaPaciente(menuPaciente?.id)}>
            <SmartToyIcon fontSize="small" sx={{ mr: 1 }} /> IA
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
