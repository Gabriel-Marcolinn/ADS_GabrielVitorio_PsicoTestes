import { useForm } from "react-hook-form";
import { gerarPDF } from "../../../services/aplicacaoService";
import ModalEnviarEmail from "../paciente/ModalEnviarEmail";
import {
  listarUsuarios,
  listarTodosUsuarios,
} from "../../../services/usuarioService";
import {
  getAuthHeaders,
  getUsuarioLogado,
} from "../../../services/authService";
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
import Paper from "@mui/material/Paper";
import ModalConfirmacaoAplicacao from "./ModalConfirmacaoAplicacao";

export default function ModalAplicarTeste({ aberta, onFechar, onCadastrar }) {
  const usuarioLogado = getUsuarioLogado();
  const tipo = usuarioLogado?.tipo;
  const isPS = tipo === "PS";
  const isPA = tipo === "PA";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [testes, setTestes] = useState([]);
  const [etapa, setEtapa] = useState(1);
  const [testeCompleto, setTesteCompleto] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalEmailAberta, setModalEmailAberta] = useState(false);
  const [modalConfirmacaoAberta, setModalConfirmacaoAberta] = useState(false);

  const usuarioIdSelecionado = watch("usuarioId");

  useEffect(() => {
    if (aberta) {
      if (isPS) {
        setValue("usuarioId", usuarioLogado.id);
      } else if (isPA) {
        listarUsuarios(usuarioLogado?.empresaId)
          .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
          .catch(console.error);
      } else {
        listarTodosUsuarios()
          .then((lista) => setUsuarios(lista.filter((u) => u.tipo === "PS")))
          .catch(console.error);
      }
      fetch("http://localhost:8080/api/testes", { headers: getAuthHeaders() })
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
    listarPacientes(usuarioIdSelecionado, "True")
      .then(setPacientes)
      .catch(console.error);
  }, [usuarioIdSelecionado]);

  function handleFechar() {
    reset();
    onFechar();
  }

  async function handleGerarPdf() {
    const blob = await gerarPDF(resultado.id);
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setEtapa(4);
  }

  async function handleProximo(data) {
    const completo = await fetch(
      `http://localhost:8080/api/testes/${data.testeId}`,
      { headers: getAuthHeaders() },
    ).then((r) => r.json());
    setTesteCompleto(completo);
    setEtapa(2);
  }

  async function handleFinalizar() {
    const { usuarioId, pacienteId, testeId } = getValues();
    const alternativasIds = Object.values(respostas);

    const resposta = await fetch("http://localhost:8080/api/aplicacoes", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Usuario-Id": usuarioId,
      },
      body: JSON.stringify({ pacienteId, testeId, alternativasIds }),
    });

    const resultado = await resposta.json();
    setResultado(resultado);
    setEtapa(3);
    setModalConfirmacaoAberta(false);
  }

  return (
    <>
      <Dialog open={aberta} onClose={handleFechar} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{ textAlign: "center" }}
          variant="h5"
          fontWeight="bold"
        >
          Cadastrar aplicacao
        </DialogTitle>

        <DialogContent>
          {etapa === 1 && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
              component="form"
              onSubmit={handleSubmit(handleProximo)}
            >
              {!isPS && (
                <TextField
                  {...register("usuarioId", {
                    required: "Usuario e obrigatorio",
                  })}
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
              )}
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
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}
            >
              {testeCompleto.perguntas.map((p, index) => (
                <Paper sx={{ p: 1 }} key={p.id}>
                  <p>{p.pergunta}</p>
                  <RadioGroup
                    value={respostas[p.id] ?? ""}
                    onChange={(e) =>
                      setRespostas((previ) => ({
                        ...previ,
                        [p.id]: Number(e.target.value),
                      }))
                    }
                  >
                    {p.alternativas.map((alt) => (
                      <FormControlLabel
                        key={alt.id}
                        value={alt.id}
                        control={<Radio />}
                        label={alt.alternativa}
                      />
                    ))}
                  </RadioGroup>
                </Paper>
              ))}
              <Button
                variant="contained"
                onClick={() => setModalConfirmacaoAberta(true)}
              >
                Finalizar
              </Button>
              <Button variant="outlined" onClick={handleFechar}>
                Cancelar
              </Button>
            </Box>
          )}

          {etapa === 3 && resultado && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pt: 1,
                alignItems: "center",
              }}
            >
              <p>
                <strong>Teste:</strong> {resultado.nomeTeste}
              </p>
              <p>
                <strong>Paciente:</strong> {resultado.nomePaciente}
              </p>
              <p>
                <strong>Pontuacao:</strong> {resultado.pontuacaoTotal}
              </p>
              <p>
                <strong>Classificacao:</strong> {resultado.classificacao}
              </p>
              <Button variant="contained" onClick={handleGerarPdf}>
                Gerar PDF
              </Button>
              <Button variant="outlined" onClick={handleFechar}>
                Fechar
              </Button>
            </Box>
          )}

          {etapa === 4 && pdfUrl && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
            >
              <iframe
                src={pdfUrl}
                width="100%"
                height="800px"
                style={{ border: "none" }}
              />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => setModalEmailAberta(true)}
                >
                  Enviar e-mail
                </Button>
                <Button variant="outlined" onClick={handleFechar}>
                  Fechar
                </Button>
              </Box>
            </Box>
          )}

          {modalEmailAberta && (
            <ModalEnviarEmail
              aberta={modalEmailAberta}
              onFechar={() => setModalEmailAberta(false)}
              idAplicacao={resultado?.id}
            />
          )}
        </DialogContent>
      </Dialog>

      <ModalConfirmacaoAplicacao
        aberta={modalConfirmacaoAberta}
        onFechar={() => setModalConfirmacaoAberta(false)}
        onConfirmar={handleFinalizar}
      />
    </>
  );
}
