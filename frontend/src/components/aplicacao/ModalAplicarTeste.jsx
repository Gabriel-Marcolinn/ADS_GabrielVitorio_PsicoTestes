import { useForm } from "react-hook-form";
import { listarTodosUsuarios } from "../../../services/usuarioService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

export default function ModalAplicarTeste({ aberta, onFechar, onCadastrar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (aberta) {
      listarTodosUsuarios()
        .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
        .catch(console.error);
    }
  }, [aberta]);

  function handleFechar() {
    reset();
    onFechar();
  }

  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h5" fontWeight="bold">
        Cadastrar aplicacao
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          component="form"
          onSubmit={handleSubmit(onCadastrar)}
        >
          <TextField
            {...register("usuarioId", { required: "Usuario e obrigatorio" })}
            label="Usuarios"
            select
            fullWidth
            defaultValue=""
            error={!!errors.usuarioId}
            helperText={errors.usuarioId?.message}
          >
            {usuarios.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.nome}
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
