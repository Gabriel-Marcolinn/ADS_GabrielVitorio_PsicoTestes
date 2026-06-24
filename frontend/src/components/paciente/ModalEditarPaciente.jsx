import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isCPF } from "validation-br";
import { getUsuarioLogado } from "../../../services/authService";
import { listarTodosUsuarios } from "../../../services/usuarioService";

function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function ModalEditarPaciente({ aberta, onFechar, paciente, onEditar }) {
  const [usuarios, setUsuarios] = useState([]);
  const usuario = getUsuarioLogado();
  const isPsicologo = usuario?.tipo === "PS";

  useEffect(() => {
    if (aberta) {
      listarTodosUsuarios()
        .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
        .catch(console.error);

      if (isPsicologo) {
        setValue("usuarioId", usuario.id);
      }
    }
  }, [aberta]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
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
          {!isPsicologo && (
            <TextField
              {...register("usuarioId", { required: "Psicólogo é obrigatório" })}
              label="Psicólogo"
              select
              fullWidth
              defaultValue={paciente?.psicologoId ?? ""}
              error={!!errors.usuarioId}
              helperText={errors.usuarioId?.message}
            >
              {usuarios.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.nome}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            {...register("nome", { required: "Nome é obrigatório" })}
            label="Nome"
            placeholder="Digite o nome do paciente"
            fullWidth
            defaultValue={paciente?.nome}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <Controller
            name="cpf"
            control={control}
            defaultValue={paciente?.cpf ? maskCPF(paciente.cpf) : ""}
            rules={{
              required: "CPF é obrigatório",
              validate: (value) => isCPF(value) || "CPF inválido",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(maskCPF(e.target.value))}
                label="CPF"
                inputProps={{ maxLength: 14 }}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            )}
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
