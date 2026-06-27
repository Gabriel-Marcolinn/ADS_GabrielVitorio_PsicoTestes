import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { login, getUsuarioLogado } from "../services/authService";
import Toast from "./components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  useEffect(() => {
    const pendente = localStorage.getItem("toast_pendente");
    if (pendente) {
      const { mensagem, tipo } = JSON.parse(pendente);
      mostrarToast(mensagem, tipo);
      localStorage.removeItem("toast_pendente");
    }
  }, []);

  async function onSubmit(data) {
    setErro("");
    setCarregando(true);
    try {
      await login(data.email, data.senha);
      const usuario = getUsuarioLogado();
      if (usuario.tipo === "AD") navigate("/empresas");
      else if (usuario.tipo === "PA") navigate("/usuarios");
      else navigate("/pacientes");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={4} sx={{ p: 4, width: 600, borderRadius: 3 }}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Seja bem-vindo ao Psicotestes!
          </Typography>

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <Box
            sx={{ flexDirection: "column" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            gap={2}
          >
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              {...register("senha")}
              label="Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "👁️" : "🙈"}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Login"}
            </Button>
          </Box>
        </Paper>
      </Box>
      <Toast toast={toast} onFechar={fecharToast} />
    </>
  );
}
