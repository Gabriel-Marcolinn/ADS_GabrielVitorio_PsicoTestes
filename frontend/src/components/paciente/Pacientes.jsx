import { useEffect, useState } from "react";
import {
  cadastrarPaciente,
  listarPacientes,
  atualizarPaciente,
  inativarPaciente,
  deletarPaciente,
} from "../../../services/pacienteService";
import { mask } from "validation-br/dist/cpf";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalCadastrarPaciente from "./ModalCadastrarPaciente";
import ModalEditarPaciente from "./ModalEditarPaciente";
import ModalDeletarPaciente from "./ModalDeletarPaciente";
import ModalInativarPaciente from "./ModalInativarPaciente";

// TODO: substituir por psicologoId vindo do contexto de autenticação
const PSICOLOGO_ID = 1;

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);
  const [modalEditarAberta, setModalEditarAberta] = useState(false);
  const [pacienteParaEditar, setPacienteParaEditar] = useState(null);
  const [modalDeletarAberta, setModalDeletarAberta] = useState(false);
  const [pacienteParaDeletar, setPacienteParaDeletar] = useState(null);
  const [modalInativarAberta, setModalInativarAberta] = useState(false);
  const [pacienteParaInativar, setPacienteParaInativar] = useState(null);

  useEffect(() => {
    listarPacientes(PSICOLOGO_ID).then(setPacientes);
  }, []);

  // CADASTRAR
  async function handleCadastrar(data) {
    try {
      const novoPaciente = await cadastrarPaciente({ ...data, psicologoId: PSICOLOGO_ID });
      setPacientes([...pacientes, novoPaciente]);
      alert("Paciente cadastrado com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      alert(error.message);
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
        psicologoId: PSICOLOGO_ID,
      });
      setPacientes(
        pacientes.map((p) =>
          p.id === pacienteParaEditar.id ? { ...p, ...data } : p,
        ),
      );
      setModalEditarAberta(false);
    } catch (error) {
      alert(error.message);
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
    } catch (error) {
      alert(error.message);
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
          + Novo Paciente
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
        {pacientes
          .filter((paciente) => paciente.ativo)
          .map((paciente) => (
            <Paper
              key={paciente.id}
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
                    {paciente.nome}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {mask(paciente.cpf)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paciente.email}
                  </Typography>
                </Box>
                <IconButton onClick={() => abrirEditar(paciente)}>
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
                <IconButton onClick={() => confirmarDeletar(paciente)}>
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton onClick={() => confirmarInativar(paciente)}>
                  <BlockIcon color="warning" />
                </IconButton>
              </Box>
            </Paper>
          ))}
      </Box>
    </Box>
  );
}
