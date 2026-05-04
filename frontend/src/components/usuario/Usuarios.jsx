import { useEffect, useState } from "react";
import {
  deletarUsuario,
  listarUsuarios,
  atualizarUsuario,
  inativarUsuario,
  cadastrarUsuario,
} from "../../../services/usuarioService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeletarUsuario from "./ModalDeletarUsuario";
import ModalInativarUsuario from "./ModalInativarUsuario";
import ModalCadastrarUsuario from "./ModalCadastrarUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";

// TODO: substituir por empresaId vindo do contexto de autenticação
const EMPRESA_ID = 1;

const TIPO_LABELS = {
  AD: { label: "Administrador", color: "primary" },
  PS: { label: "Psicólogo", color: "success" },
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

  useEffect(() => {
    listarUsuarios(EMPRESA_ID).then(setUsuarios);
  }, []);

  // DELETAR
  function confirmarDeletar(usuario) {
    setUsuarioParaDeletar(usuario);
    setModalDeletarAberta(true);
  }

  async function handleDeletar() {
    try {
      await deletarUsuario(usuarioParaDeletar.id);
      setUsuarios(usuarios.filter((u) => u.id !== usuarioParaDeletar.id));
      setModalDeletarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  // INATIVAR
  function confirmarInativar(usuario) {
    setUsuarioParaInativar(usuario);
    setModalInativarAberta(true);
  }

  async function handleInativar() {
    try {
      await inativarUsuario(usuarioParaInativar.id);
      setUsuarios(usuarios.filter((u) => u.id !== usuarioParaInativar.id));
      setModalInativarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  // EDITAR
  function abrirEditar(usuario) {
    setUsuarioParaEditar(usuario);
    setModalEditarAberta(true);
  }

  async function handleEditar(data) {
    try {
      await atualizarUsuario(usuarioParaEditar.id, {
        ...data,
        empresaId: EMPRESA_ID,
      });
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioParaEditar.id ? { ...u, ...data } : u,
        ),
      );
      setModalEditarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  // CADASTRAR
  async function handleCadastrar(data) {
    try {
      const novoUsuario = await cadastrarUsuario({ ...data, empresaId: EMPRESA_ID });
      setUsuarios([...usuarios, novoUsuario]);
      alert("Usuário cadastrado com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
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
            background: "linear-gradient(135deg, #1565c0, #1581c0)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0px 0px 30px rgba(24, 161, 219, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #1255a1, #0f689b)",
              boxShadow: "0px 0px 30px rgba(24, 161, 219, 0.6)",
            },
          }}
        >
          + Novo Usuário
        </Button>
      </Box>

      {/* LISTAGEM */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          maxWidth: 1200,
        }}
      >
        {usuarios
          .filter((usuario) => usuario.ativo)
          .map((usuario) => (
            <Paper
              key={usuario.id}
              elevation={2}
              sx={{
                p: 3,
                width: 380,
                borderRadius: 3,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography fontWeight="bold" variant="h5">
                    {usuario.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {usuario.email}
                  </Typography>
                  <Chip
                    label={TIPO_LABELS[usuario.tipo]?.label ?? usuario.tipo}
                    color={TIPO_LABELS[usuario.tipo]?.color ?? "default"}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <IconButton onClick={() => abrirEditar(usuario)}>
                  <EditIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton onClick={() => confirmarDeletar(usuario)}>
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton onClick={() => confirmarInativar(usuario)}>
                  <BlockIcon color="warning" />
                </IconButton>
              </Box>
            </Paper>
          ))}
      </Box>
    </Box>
  );
}
