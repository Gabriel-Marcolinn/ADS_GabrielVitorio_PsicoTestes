import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mask, normalize } from "validation-br/dist/cnpj";
import {
  deletarEmpresa,
  listarEmpresas,
  atualizarEmpresa,
  inativarEmpresa,
  cadastrarEmpresa,
} from "../../../services/empresaService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeletarEmpresa from "./ModalDeletarEmpresa";
import ModalInativarEmpresa from "./ModalInativarEmpresa";
import ModalCadastrarEmpresa from "./ModalCadastrarEmpresa";
import ModalEditarEmpresa from "./ModalEditarEmpresa";
import ModalListarPsicologos from "./ModalListarPsicologos";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [modalDeletarAberta, setModalDeletarAberta] = useState(false);
  const [empresaParaDeletar, setEmpresaParaDeletar] = useState(null);
  const [modalEditarAberta, setModalEditarAberta] = useState(false);
  const [empresaParaEditar, setEmpresaParaEditar] = useState(null);
  const [empresaParaInativar, setEmpresaParaInativar] = useState(null);
  const [modalInativarAberta, setModalInativarAberta] = useState(false);
  const [modalCadastrarAberta, setModalCadastrarAberta] = useState(false);
  const [modalPsicologosAberta, setModalPsicologosAberta] = useState(false);
  const [empresaParaPsicologos, setEmpresaParaPsicologos] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

  // DELETAR EMPRESA
  function confirmarDeletar(empresa) {
    setEmpresaParaDeletar(empresa);
    setModalDeletarAberta(true);
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

  // INATIVAR EMPRESA
  function confirmarInativar(empresa) {
    setEmpresaParaInativar(empresa);
    setModalInativarAberta(true);
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

  // EDITAR EMPRESA
  function abrirEditar(empresa) {
    setEmpresaParaEditar(empresa);
    setModalEditarAberta(true);
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

  // CADASTRAR EMPRESA
  function abrirCadastrar() {
    setModalCadastrarAberta(true);
  }

  async function handleCadastrar(data) {
    try {
      const novaEmpresa = await cadastrarEmpresa(data);
      setEmpresas([...empresas, novaEmpresa]);
      alert("Empresa cadastrada com sucesso!");
      setModalCadastrarAberta(false);
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
      {modalDeletarAberta && (
        <ModalDeletarEmpresa
          aberta={modalDeletarAberta}
          onFechar={() => setModalDeletarAberta(false)}
          empresa={empresaParaDeletar}
          onDeletar={handleDeletar}
        />
      )}

      {modalInativarAberta && (
        <ModalInativarEmpresa
          aberta={modalInativarAberta}
          onFechar={() => setModalInativarAberta(false)}
          empresa={empresaParaInativar}
          onInativar={handleInativar}
        />
      )}

      {modalCadastrarAberta && (
        <ModalCadastrarEmpresa
          aberta={modalCadastrarAberta}
          onFechar={() => setModalCadastrarAberta(false)}
          onCadastrar={handleCadastrar}
        />
      )}

      {modalEditarAberta && (
        <ModalEditarEmpresa
          aberta={modalEditarAberta}
          onFechar={() => setModalEditarAberta(false)}
          empresa={empresaParaEditar}
          onEditar={handleEditar}
        />
      )}

      {modalPsicologosAberta && (
        <ModalListarPsicologos
          aberta={modalPsicologosAberta}
          onFechar={() => setModalPsicologosAberta(false)}
          empresa={empresaParaPsicologos}
        />
      )}

      {/* TITULO E BOTAO PARA CADASTRAR EMPRESA */}
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
          onClick={() => abrirCadastrar(true)}
          sx={{
            background: "linear-gradient(135deg, #0097a7, #00bcd4)",
            color: "#fafafa",
            borderRadius: 3,
            boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #00838f, #0097a7)",
              boxShadow: "0px 0px 30px rgba(0, 188, 212, 0.6)",
            },
          }}
        >
          + Nova Empresa
        </Button>
      </Box>

      {/* LISTAGEM DE EMPRESA */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          maxWidth: 1200,
        }}
      >
        {empresas
          .filter((empresa) => empresa.ativo)
          .map((empresa) => (
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
                <IconButton
                  onClick={() => {
                    setEmpresaParaPsicologos(empresa);
                    setModalPsicologosAberta(true);
                  }}
                >
                  <PersonSearchIcon />
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
