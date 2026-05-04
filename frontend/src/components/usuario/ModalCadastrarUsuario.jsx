import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const TIPOS_USUARIO = [
  { value: "AD", label: "Administrador" },
  { value: "PS", label: "Psicólogo" },
];

export default function ModalCadastrarUsuario({
  aberta,
  onFechar,
  onCadastrar,
}) {
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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h5" fontWeight="bold">
        Cadastrar usuário
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          component="form"
          onSubmit={handleSubmit(onCadastrar)}
        >
          <TextField
            {...register("nome", { required: "Nome é obrigatório" })}
            label="Nome"
            placeholder="Digite o nome completo"
            fullWidth
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
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("senha", { required: "Senha é obrigatória" })}
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite a senha"
            fullWidth
            autoComplete="new-password"
            error={!!errors.senha}
            helperText={errors.senha?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "👁️" : "🙈"}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            {...register("tipo", { required: "Tipo é obrigatório" })}
            label="Tipo"
            select
            fullWidth
            defaultValue=""
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
              Cadastrar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
