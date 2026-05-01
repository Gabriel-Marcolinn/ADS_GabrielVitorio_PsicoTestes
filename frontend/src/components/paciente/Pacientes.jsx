import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarPaciente, listarPacientes } from "../../../services/pacienteService";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ModalCadastrarPaciente from "./ModalCadastrarPaciente";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    listarPacientes(1).then(setPacientes);
  }, []);

  // CADASTRAR PACIENTE
  function abrirCadastrar() {
    setModalCadastrarAberta(true);
  }

  async function handleCadastrar(data) {
    try {
      const novoPaciente = await cadastrarPaciente({ ...data, psicologoId: 1 });
      setPacientes([...pacientes, novoPaciente]);
      alert("Paciente cadastrado com sucesso!");
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
      {modalCadastrarAberta && (
        <ModalCadastrarPaciente
          aberta={modalCadastrarAberta}
          onFechar={() => setModalCadastrarAberta(false)}
          onCadastrar={handleCadastrar}
        />
      )}

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
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Box>
            <Typography variant="h4">Gerenciar Pacientes</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todos os pacientes cadastrados no sistema
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => abrirCadastrar(true)}
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
              height: "100%",
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
              </Box>
              <IconButton onClick={() => abrirEditar(paciente)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
    </Box>
  );
}
