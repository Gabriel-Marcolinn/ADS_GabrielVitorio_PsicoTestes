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
import { listarPacientes } from "../../../services/pacienteService";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function ModalAplicarTeste({ aberta, onFechar, onCadastrar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [testes, setTestes] = useState([]);
  const [etapa, setEtapa] = useState(1);
  const [testeCompleto, setTesteCompleto] = useState(null);

  const usuarioIdSelecionado = watch("usuarioId");

  useEffect(() => {
    if (aberta) {
      listarTodosUsuarios()
        .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
        .catch(console.error);
      fetch("http://localhost:8080/api/testes")
        .then((r) => r.json())
        .then(setTestes)
        .catch(console.error);
    }
  }, [aberta]);

  useEffect(() => {
    if (!usuarioIdSelecionado) {
      setPacientes([]);
      return;
    }
    setValue("pacienteId", "");
    listarPacientes(usuarioIdSelecionado)
      .then(setPacientes)
      .catch(console.error);
  }, [usuarioIdSelecionado]);

  function handleFechar() {
    reset();
    onFechar();
  }

  async function handleProximo(data) {
    const completo = await fetch(
      `http://localhost:8080/api/testes/${data.testeId}`,
    ).then((r) => r.json());
    setTesteCompleto(completo);
    setEtapa(2);
  }

  return (
    <Dialog open={aberta} onClose={handleFechar}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h5" fontWeight="bold">
        Cadastrar aplicacao
      </DialogTitle>

      <DialogContent>
        {etapa === 1 && (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
            component="form"
            onSubmit={handleSubmit(handleProximo)}
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
            <TextField
              {...register("pacienteId", {
                required: "Paciente e obrigatorio",
              })}
              label="Pacientes"
              select
              fullWidth
              defaultValue=""
              error={!!errors.pacienteId}
              helperText={errors.pacienteId?.message}
            >
              {pacientes.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nome}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register("testeId", { required: "Teste e obrigatorio" })}
              label="Testes"
              select
              fullWidth
              defaultValue=""
              error={!!errors.testeId}
              helperText={errors.testeId?.message}
            >
              {testes.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.nome}
                </MenuItem>
              ))}
            </TextField>

            <DialogActions>
              <Button variant="outlined" onClick={handleFechar}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Proximo
              </Button>
            </DialogActions>
          </Box>
        )}

        {etapa === 2 && testeCompleto && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            {testeCompleto.perguntas.map((p, index) => (
              <Box key={p.id}>
                <p>{p.pergunta}</p>
                <RadioGroup>
                  {p.alternativas.map((alt) => (
                    <FormControlLabel
                      key={alt.id}
                      value={alt.id}
                      control={<Radio />}
                      label={alt.alternativa}
                    />
                  ))}
                </RadioGroup>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
