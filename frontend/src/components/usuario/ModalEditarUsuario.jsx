import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";

const TIPOS_USUARIO = [
  { value: "AD", label: "Administrador" },
  { value: "PS", label: "Psicólogo" },
];

export default function ModalEditarUsuario({ aberta, onFechar, usuario, onEditar }) {
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
        Editar <strong>{usuario?.nome}</strong>
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
            placeholder="Digite o nome completo"
            fullWidth
            defaultValue={usuario?.nome}
            error={!!errors.nome}
            helperText={errors.nome?.message}
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
            placeholder="Digite o e-mail"
            fullWidth
            defaultValue={usuario?.email}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("senha", { required: "Senha é obrigatória" })}
            label="Nova senha"
            type="password"
            placeholder="Digite a nova senha"
            autoComplete="new-password"
            fullWidth
            error={!!errors.senha}
            helperText={errors.senha?.message || "Informe a senha para alterá-la"}
          />
          <TextField
            {...register("tipo", { required: "Tipo é obrigatório" })}
            label="Tipo"
            select
            fullWidth
            defaultValue={usuario?.tipo ?? ""}
            error={!!errors.tipo}
            helperText={errors.tipo?.message}
          >
            {TIPOS_USUARIO.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </MenuItem>
            ))}
          </TextField>
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
