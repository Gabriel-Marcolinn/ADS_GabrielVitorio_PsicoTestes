import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { data, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isCNPJ, validate } from "validation-br";
import { mask } from "validation-br/dist/cnpj";
import {
  deletarEmpresa,
  listarEmpresas,
  atualizarEmpresa,
  inativarEmpresa,
} from "../services/empresaService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [modalDeletarAberta, setModalDeletarAberta] = useState(false);
  const [empresaParaDeletar, setEmpresaParaDeletar] = useState(null);
  const [modalEditarAberta, setModalEditarAberta] = useState(false);
  const [empresaParaEditar, setEmpresaParaEditar] = useState(null);
  const [empresaParaInativar, setEmpresaParaInativar] = useState(null);
  const [modalInativarAberta, setModalInativarAberta] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

  function confirmarDeletar(empresa) {
    setEmpresaParaDeletar(empresa);
    setModalDeletarAberta(true);
  }

  function confirmarInativar(empresa) {
    setEmpresaParaInativar(empresa);
    setModalInativarAberta(true);
  }

  function abrirEditar(empresa) {
    setEmpresaParaEditar(empresa);
    setModalEditarAberta(true);
  }

  async function handleDeletar() {
    try {
      await deletarEmpresa(empresaParaDeletar.id);
      setEmpresas(empresas.filter((e) => e.id !== empresaParaDeletar.id));
      setModalDeletarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleInativar() {
    try {
      await inativarEmpresa(empresaParaInativar.id);
      setEmpresas(empresas.filter((e) => e.id !== empresaParaInativar.id));
      setModalInativarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleEditar(data) {
    try {
      await atualizarEmpresa(empresaParaEditar.id, data);
      setEmpresas(
        empresas.map((e) =>
          e.id === empresaParaEditar.id ? { ...e, ...data } : e,
        ),
      );
      setModalEditarAberta(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Dialog
        open={modalEditarAberta}
        onClose={() => setModalEditarAberta(false)}
      >
        <DialogTitle>
          Editar <strong>{empresaParaEditar?.razaoSocial}</strong>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(handleEditar)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
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
              defaultValue={empresaParaEditar?.cnpj}
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
              defaultValue={empresaParaEditar?.razaoSocial}
              error={!!errors.razaoSocial}
              helperText={errors.razaoSocial?.message}
            />
            <DialogActions>
              <Button onClick={() => setModalEditarAberta(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalDeletarAberta}
        onClose={() => setModalDeletarAberta(false)}
      >
        <DialogTitle>
          Deletar <strong>{empresaParaDeletar?.razaoSocial}</strong>?
        </DialogTitle>
        <DialogContent>
          Tem certeza que deseja deletar {empresaParaDeletar?.razaoSocial}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalDeletarAberta(false)}>Cancelar</Button>
          <Button onClick={handleDeletar} color="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalInativarAberta}
        onClose={() => setModalInativarAberta(false)}
      >
        <DialogTitle>
          Inativar <strong>{empresaParaInativar?.razaoSocial}</strong>?
        </DialogTitle>
        <DialogContent>
          Tem certeza que deseja inativar{" "}
          <strong>{empresaParaInativar?.razaoSocial}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalInativarAberta(false)}>
            Cancelar
          </Button>
          <Button onClick={handleInativar} color="error" variant="contained">
            Inativar
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Empresas cadastradas:
        </Typography>

        <Button variant="contained" onClick={() => navigate("./cadastro")}>
          Cadastrar empresa
        </Button>
      </Box>
      <Paper elevation={4} sx={{ p: 2, width: 600, borderRadius: 3 }}>
        {empresas.map((empresa) => (
          <Box
            sx={{
              outline: "2px solid grey",
              borderRadius: 2,
              mb: "8px",
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
            key={empresa.id}
          >
            <p>
              {empresa.razaoSocial} - {mask(empresa.cnpj)}
            </p>
            <Box>
              <Button
                variant="outlined"
                color="error"
                sx={{ mr: "2px" }}
                onClick={() => confirmarDeletar(empresa)}
              >
                Deletar
              </Button>
              <Button
                variant="outlined"
                color="warning"
                sx={{ mr: "2px" }}
                onClick={() => confirmarInativar(empresa)}
              >
                Inativar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: "2px" }}
                onClick={() => abrirEditar(empresa)}
              >
                Editar
              </Button>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
