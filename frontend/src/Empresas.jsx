import { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";

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
        pt: 3,
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
              <Button
                variant="outlined"
                onClick={() => setModalEditarAberta(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "white",
                }}
              >
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
          <Button
            variant="outlined"
            onClick={() => setModalDeletarAberta(false)}
          >
            Cancelar
          </Button>
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
          <Button
            variant="outlined"
            onClick={() => setModalInativarAberta(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleInativar} color="warning" variant="contained">
            Inativar
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Box>
            <Typography variant="h4">Gerenciar Empresas</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todas as empresas cadastradas no sistema
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("./cadastro")}
          sx={{
            background: "linear-gradient(135deg, #1565c0, #1581c0)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0px 0px 30px rgba(24, 161, 219, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #1255a1, #0f689b)",
              boxShadow: "0px 0px 30px rgba(24, 161, 219, 0.6)",
            },
          }}
        >
          + Nova Empresa
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          maxWidth: 1200,
        }}
      >
        {empresas.map((empresa) => (
          <Paper
            key={empresa.id}
            elevation={2}
            sx={{
              p: 3,
              width: 380,
              borderRadius: 3,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography fontWeight="bold" variant="h5">
                  {empresa.razaoSocial}
                </Typography>
                <Typography variant="body2" color="primary">
                  {mask(empresa.cnpj)}
                </Typography>
              </Box>
              <IconButton onClick={() => abrirEditar(empresa)}>
                <EditIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <IconButton onClick={() => confirmarDeletar(empresa)}>
                <DeleteIcon size="small" color="error" variant="outlined">
                  Deletar
                </DeleteIcon>
              </IconButton>
              <IconButton onClick={() => confirmarInativar(empresa)}>
                <BlockIcon size="small" color="warning" variant="outlined">
                  Inativar
                </BlockIcon>
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
