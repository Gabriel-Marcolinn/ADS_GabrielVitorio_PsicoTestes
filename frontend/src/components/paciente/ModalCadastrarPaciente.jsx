import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isCPF } from "validation-br";
import { listarTodosUsuarios } from "../../../services/usuarioService";

export default function ModalCadastrarPaciente({
  aberta,
  onFechar,
  onCadastrar,
}) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (aberta) {
      listarTodosUsuarios()
        .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
        .catch(console.error);
    }
  }, [aberta]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleFechar() {
    reset();
    onFechar();
  }

  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h5" fontWeight="bold">
        Cadastrar paciente
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ flexDirection: "column", p: 1 }}
          component="form"
          onSubmit={handleSubmit(onCadastrar)}
        >
          <TextField
            {...register("usuarioId", {
              required: "Usuario e obrigatorio",
            })}
            label="Psicólogo"
            select
            fullWidth
            defaultValue=""
            sx={{ mb: 2 }}
            error={!!errors.usuarioId}
            helperText={errors.usuarioId?.message}
          >
            {usuarios.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register("cpf", {
              required: "CPF e obrigatorio",
              validate: (value) => isCPF(value) || "CPF invalido",
            })}
            label="CPF"
            placeholder="Digite o CPF do paciente"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />

          <TextField
            {...register("nome", {
              required: "Nome e obrigatorio",
            })}
            label="Nome"
            placeholder="Digite o nome do paciente"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />

          <TextField
            {...register("email", {
              required: "E-mail e obrigatorio",
            })}
            label="E-mail"
            placeholder="Digite o e-mail do paciente"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <DialogActions>
            <Button variant="outlined" onClick={handleFechar}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
}
