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
import PsychologyIcon from "@mui/icons-material/Psychology";
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
      if (usuario.tipo === "AD") navigate("/dashboard-admin");
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
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #EEF2FF 0%, #F1F5F9 50%, #E0E7FF 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper sx={{ width: 420, overflow: "hidden", p: 0 }}>
          {/* Cabeçalho com gradiente */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
              p: 4,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                background: "rgba(255,255,255,0.15)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <PsychologyIcon sx={{ color: "#fff", fontSize: 34 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "white" }}
              fontWeight={700}
              mb={0.5}
            >
              Psicotestes
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.85rem" }}
            >
              Sistema de Avaliação Psicológica
            </Typography>
          </Box>

          {/* Formulário */}
          <Box sx={{ p: 4 }}>
            <Typography sx={{ mb: 1 }} variant="h6" fontWeight={700}>
              Seja bem-vindo ao Psicotestes!
            </Typography>

            {erro && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {erro}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                {...register("email")}
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                {...register("senha")}
                label="Senha"
                type={showPassword ? "text" : "password"}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
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
                size="large"
                sx={{ mt: 1 }}
              >
                {carregando ? "Entrando..." : "Login"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Toast toast={toast} onFechar={fecharToast} />
    </>
  );
}
