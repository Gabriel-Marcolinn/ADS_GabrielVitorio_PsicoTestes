import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { isCNPJ } from "validation-br";
import validate, { normalize } from "validation-br/dist/cnpj";

export default function ModalEditarEmpresa({
  aberta,
  onFechar,
  empresa,
  onEditar,
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
      <DialogTitle>
        Editar <strong>{empresa?.razaoSocial}</strong>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          component="form"
          onSubmit={handleSubmit(onEditar)}
        >
          <TextField
            {...register("cnpj", {
              required: "CNPJ é obrigatório",
              validate: (value) => isCNPJ(value) || "CNPJ inválido",
            })}
            label="CNPJ"
            placeholder="Digite o CNPJ"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={normalize(empresa?.cnpj)}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
          />
          <TextField
            {...register("razaoSocial", {
              required: "Razão Social é obrigatória",
            })}
            label="Razão Social"
            placeholder="Digite a Razão Social"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={empresa?.razaoSocial}
            error={!!errors.razaoSocial}
            helperText={errors.razaoSocial?.message}
          />
          <DialogActions>
            <Button variant="outlined" onClick={handleFechar}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "#fafafa",
              }}
            >
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
