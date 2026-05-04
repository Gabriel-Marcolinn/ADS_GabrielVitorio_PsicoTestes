import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { isCPF } from "validation-br";
import { normalize } from "validation-br/dist/cpf";

export default function ModalEditarPaciente({ aberta, onFechar, paciente, onEditar }) {
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
      <DialogTitle>
        Editar <strong>{paciente?.nome}</strong>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          component="form"
          onSubmit={handleSubmit(onEditar)}
        >
          <TextField
            {...register("nome", { required: "Nome é obrigatório" })}
            label="Nome"
            placeholder="Digite o nome do paciente"
            fullWidth
            defaultValue={paciente?.nome}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            {...register("cpf", {
              required: "CPF é obrigatório",
              validate: (value) => isCPF(value) || "CPF inválido",
            })}
            label="CPF"
            placeholder="Digite o CPF do paciente"
            fullWidth
            defaultValue={normalize(paciente?.cpf)}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />
          <TextField
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de e-mail inválido",
              },
            })}
            label="E-mail"
            placeholder="Digite o e-mail do paciente"
            fullWidth
            defaultValue={paciente?.email}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <DialogActions>
            <Button variant="outlined" onClick={handleFechar}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
