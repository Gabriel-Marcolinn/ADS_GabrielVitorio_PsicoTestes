import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { listarEmpresas } from "../../../services/empresaService";
import { getUsuarioLogado } from "../../../services/authService";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const TIPOS_USUARIO_PA = [
  { value: "PS", label: "Psicólogo" },
  { value: "PA", label: "Psicólogo Administrador" },
];

const TIPOS_USUARIO_AD = [
  { value: "AD", label: "Administrador" },
  { value: "PS", label: "Psicólogo" },
  { value: "PA", label: "Psicólogo Administrador" },
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
    setValue,
  } = useForm();

  const usuarioLogado = getUsuarioLogado();
  const isPA = usuarioLogado?.tipo === "PA";
  const tiposUsuario =
    usuarioLogado?.tipo === "AD" ? TIPOS_USUARIO_AD : TIPOS_USUARIO_PA;

  const [showPassword, setShowPassword] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    if (aberta) {
      if (isPA) {
        setValue("empresaId", usuarioLogado.empresaId);
      } else {
        listarEmpresas().then(setEmpresas);
      }
    }
  }, [aberta]);

  function handleFechar() {
    reset();
    onFechar();
  }

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
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: { value: 8, message: "Senha precisa ter 8 ou mais caracteres!"},
            })}
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite a senha"
            autoComplete="new-password"
            fullWidth
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
            {tiposUsuario.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </MenuItem>
            ))}
          </TextField>
          {!isPA && (
            <TextField
              {...register("empresaId", { required: "Empresa é obrigatória" })}
              label="Empresa"
              select
              fullWidth
              defaultValue=""
              error={!!errors.empresaId}
              helperText={errors.empresaId?.message}
            >
              {empresas.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.razaoSocial}
                </MenuItem>
              ))}
            </TextField>
          )}
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
