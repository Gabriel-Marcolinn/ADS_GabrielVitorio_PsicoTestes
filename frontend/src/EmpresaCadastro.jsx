import { useForm } from "react-hook-form";
import { isCNPJ, validate } from "validation-br";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function EmpresaCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await fetch("http://localhost:8080/api/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Empresa cadastrada com sucesso!");
        navigate("/empresas");
      } else {
        alert("Erro ao cadastrar a empresa");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexao com o servidor");
    }
  }

  return (
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
          Cadastro de Empresa
        </Typography>
        <Box
          sx={{ flexDirection: "column" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("cnpj", {
              required: "CNPJ e obrigatorio",
              validate: (value) => isCNPJ(value) || "CNPJ invalido",
            })}
            label="CNPJ"
            placeholder="Digite o CNPJ"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
          />
          <TextField
            {...register("razaoSocial", {
              required: "Razao Social e obrigatoria",
            })}
            label="Razão Social"
            placeholder="Digite a Razão Social"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.razaoSocial}
            helperText={errors.razaoSocial?.message}
          />
          <Button type="submit" variant="contained" fullWidth>
            Cadastrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
