import { useEffect, useState } from "react";
import {
  deletarUsuario,
  listarUsuarios,
  listarTodosUsuarios,
  atualizarUsuario,
  inativarUsuario,
  cadastrarUsuario,
} from "../../../services/usuarioService";
import { getUsuarioLogado } from "../../../services/authService";
import { listarEmpresas } from "../../../services/empresaService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ModalDeletarUsuario from "./ModalDeletarUsuario";
import ModalInativarUsuario from "./ModalInativarUsuario";
import ModalCadastrarUsuario from "./ModalCadastrarUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";
import Toast from "../Toast";
import Select from "@mui/material/Select";

const TIPO_LABELS = {
  AD: { label: "Administrador", color: "primary" },
  PS: { label: "Psicólogo", color: "success" },
  PA: { label: "Psicólogo Administrador", color: "warning" },
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalDeletarAberta, setModalDeletarAberta] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);
  const [modalEditarAberta, setModalEditarAberta] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [usuarioParaInativar, setUsuarioParaInativar] = useState(null);
  const [modalInativarAberta, setModalInativarAberta] = useState(false);
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);
  const [menuAncora, setMenuAncora] = useState(null);
  const [ativosTrue, setAtivosTrue] = useState(true);
  const [menuUsuario, setMenuUsuario] = useState(null);
  const [buscaNome, setBuscaNome] = useState("");
  const [empresaMap, setEmpresaMap] = useState({});

  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  const usuarioLogado = getUsuarioLogado();

  useEffect(() => {
    const busca =
      usuarioLogado.tipo === "AD"
        ? listarTodosUsuarios()
        : listarUsuarios(usuarioLogado.empresaId, ativosTrue);
    busca.then((data) => setUsuarios(data ?? [])).catch(() => setUsuarios([]));

    if (usuarioLogado.tipo === "AD") {
      listarEmpresas()
        .then((data) => {
          const mapa = {};
          (data ?? []).forEach((e) => { mapa[e.id] = e.razaoSocial; });
          setEmpresaMap(mapa);
        })
        .catch(() => {});
    }
  }, [ativosTrue]);

  function confirmarDeletar(usuario) {
    setUsuarioParaDeletar(usuario);
    setModalDeletarAberta(true);
  }

  async function handleDeletar() {
    try {
      await deletarUsuario(usuarioParaDeletar.id);
      setUsuarios(usuarios.filter((u) => u.id !== usuarioParaDeletar.id));
      setModalDeletarAberta(false);
      mostrarToast("Usuário deletado com sucesso!");
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  function confirmarInativar(usuario) {
    setUsuarioParaInativar(usuario);
    setModalInativarAberta(true);
  }

  async function handleInativar() {
    try {
      await inativarUsuario(usuarioParaInativar.id);
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioParaInativar.id ? { ...u, ativo: !u.ativo } : u,
        ),
      );
      setModalInativarAberta(false);
      mostrarToast(
        usuarioParaInativar.ativo
          ? "Usuario inativado com sucesso!"
          : "Usuario ativado com sucesso!",
      );
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  function abrirEditar(usuario) {
    setUsuarioParaEditar(usuario);
    setModalEditarAberta(true);
  }

  async function handleEditar(data) {
    try {
      await atualizarUsuario(usuarioParaEditar.id, {
        ...data,
        empresaId: usuarioLogado.empresaId,
      });
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioParaEditar.id ? { ...u, ...data } : u,
        ),
      );
      setModalEditarAberta(false);
      mostrarToast("Usuário atualizado com sucesso!");
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  async function handleCadastrar(data) {
    try {
      const novoUsuario = await cadastrarUsuario(data);
      setUsuarios([...usuarios, novoUsuario]);
      mostrarToast("Usuário cadastrado com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      mostrarToast(error.message, "error");
    }
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
        {modalDeletarAberta && (
          <ModalDeletarUsuario
            aberta={modalDeletarAberta}
            onFechar={() => setModalDeletarAberta(false)}
            usuario={usuarioParaDeletar}
            onDeletar={handleDeletar}
          />
        )}

        {modalInativarAberta && (
          <ModalInativarUsuario
            aberta={modalInativarAberta}
            onFechar={() => setModalInativarAberta(false)}
            usuario={usuarioParaInativar}
            onInativar={handleInativar}
          />
        )}

        {modalCadastrarAberta && (
          <ModalCadastrarUsuario
            aberta={modalCadastrarAberta}
            onFechar={() => setModalCadastrarAberta(false)}
            onCadastrar={handleCadastrar}
          />
        )}

        {modalEditarAberta && (
          <ModalEditarUsuario
            aberta={modalEditarAberta}
            onFechar={() => setModalEditarAberta(false)}
            usuario={usuarioParaEditar}
            onEditar={handleEditar}
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
            <Typography variant="h4">Gerenciar Usuários</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todos os usuários cadastrados no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalCadastrarAberta(true)}
            sx={{
              background: "linear-gradient(135deg, #0097a7, #00bcd4)",
              color: "#fafafa",
              borderRadius: 3,
              boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #00838f, #0097a7)",
                boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.6)",
              },
            }}
          >
            + Novo Usuário
          </Button>
        </Box>

        {/* FILTRO */}
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
        </Box>

        {/* LISTAGEM */}
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "75%" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#dddcdc" }}>
              <TableRow>
                <TableCell>
                  <strong>Nome</strong>
                </TableCell>
                <TableCell>
                  <strong>E-mail</strong>
                </TableCell>
                <TableCell>
                  <strong>Tipo</strong>
                </TableCell>
                {usuarioLogado.tipo === "AD" && (
                  <TableCell>
                    <strong>Empresa</strong>
                  </TableCell>
                )}
                <TableCell>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {usuarios.filter(
                (u) =>
                  u.ativo === ativosTrue &&
                  u.nome.toLowerCase().includes(buscaNome.toLowerCase()) &&
                  !(usuarioLogado.tipo === "PA" && u.tipo === "AD"),
              ).length === 0 ? (
                ativosTrue ? (
                  <TableRow>
                    <TableCell colSpan={usuarioLogado.tipo === "AD" ? 5 : 4} align="center" sx={{ p: 8 }}>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="h4">
                          Nenhum usuario encontrado!
                        </Typography>
                        <Typography variant="h6">
                          Vamos cadastrar um usuario?
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={() => setModalCadastrarAberta(true)}
                        sx={{ m: 2 }}
                      >
                        Novo usuario
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={usuarioLogado.tipo === "AD" ? 5 : 4} align="center" sx={{ p: 8 }}>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="h4">
                          Nenhum usuario encontrado!
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
                usuarios
                  .filter((u) => u.ativo === ativosTrue)
                  .filter((u) =>
                    u.nome.toLowerCase().includes(buscaNome.toLowerCase()),
                  )
                  .filter(
                    (u) => !(usuarioLogado.tipo === "PA" && u.tipo === "AD"),
                  )
                  .map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>{usuario.nome}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            TIPO_LABELS[usuario.tipo]?.label ?? usuario.tipo
                          }
                          color={TIPO_LABELS[usuario.tipo]?.color ?? "default"}
                          size="small"
                        />
                      </TableCell>
                      {usuarioLogado.tipo === "AD" && (
                        <TableCell>
                          {empresaMap[usuario.empresaId] ?? "—"}
                        </TableCell>
                      )}
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            setMenuAncora(e.currentTarget);
                            setMenuUsuario(usuario);
                          }}
                          sx={{ p: 1, background: "#dddcdc", borderRadius: 2 }}
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

        <Menu
          anchorEl={menuAncora}
          open={Boolean(menuAncora)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => setMenuAncora(null)}
        >
          <MenuItem
            onClick={() => {
              abrirEditar(menuUsuario);
              setMenuAncora(null);
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarDeletar(menuUsuario);
              setMenuAncora(null);
            }}
          >
            <DeleteIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Deletar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarInativar(menuUsuario);
              setMenuAncora(null);
            }}
          >
            {menuUsuario?.ativo ? (
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
        </Menu>
      </Box>
    </>
  );
}
