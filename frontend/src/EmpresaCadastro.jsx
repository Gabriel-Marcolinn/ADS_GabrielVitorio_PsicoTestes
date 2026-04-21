import { useForm } from "react-hook-form";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EmpresaCadastro() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
      <h1>Cadastro de Empresa</h1>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} width={400}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              {...register("cnpj")}
              label="CNPJ"
              placeholder="Digite o CNPJ"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              {...register("razao_social")}
              label="Razão Social"
              placeholder="Digite a Razão Social"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
