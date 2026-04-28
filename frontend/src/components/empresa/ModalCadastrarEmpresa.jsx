import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { isCNPJ } from "validation-br";

export default function ModalCadastrarEmpresa({
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

  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h5" fontWeight="bold">
        Cadastrar empresa
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
}
