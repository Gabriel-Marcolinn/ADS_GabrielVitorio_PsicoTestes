import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { isCNPJ } from "validation-br";

function maskCNPJ(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export default function ModalCadastrarEmpresa({
  aberta,
  onFechar,
  onCadastrar,
}) {
  const {
    register,
    handleSubmit,
    control,
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
            <Controller
              name="cnpj"
              control={control}
              rules={{
                required: "CNPJ é obrigatório",
                validate: (value) => isCNPJ(value) || "CNPJ inválido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(maskCNPJ(e.target.value))}
                  label="CNPJ"
                  inputProps={{ maxLength: 18 }}
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!errors.cnpj}
                  helperText={errors.cnpj?.message}
                />
              )}
            />
            <TextField
              {...register("razaoSocial", {
                required: "Razão Social é obrigatória",
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
