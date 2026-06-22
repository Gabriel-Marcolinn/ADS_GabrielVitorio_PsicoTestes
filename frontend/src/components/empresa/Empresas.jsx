import { useEffect, useState } from "react";
import { mask } from "validation-br/dist/cnpj";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ModalDeletarEmpresa from "./ModalDeletarEmpresa";
import ModalInativarEmpresa from "./ModalInativarEmpresa";
import ModalCadastrarEmpresa from "./ModalCadastrarEmpresa";
import ModalEditarEmpresa from "./ModalEditarEmpresa";
import ModalListarPsicologos from "./ModalListarPsicologos";
import Toast from "../Toast";

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
  const [menuAncora, setMenuAncora] = useState(null);
  const [menuEmpresa, setMenuEmpresa] = useState(null);

  const [toast, setToast] = useState({
    aberto: false,
    mensagem: "",
    tipo: "success",
  });
  const mostrarToast = (mensagem, tipo = "success") =>
    setToast({ aberto: true, mensagem, tipo });
  const fecharToast = () => setToast((t) => ({ ...t, aberto: false }));

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

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
      mostrarToast(error.message, "error");
    }
  }

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
      mostrarToast(error.message, "error");
    }
  }

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
      mostrarToast(error.message, "error");
    }
  }

  async function handleCadastrar(data) {
    try {
      const novaEmpresa = await cadastrarEmpresa(data);
      setEmpresas([...empresas, novaEmpresa]);
      mostrarToast("Empresa cadastrada com sucesso!");
      setModalCadastrarAberta(false);
    } catch (error) {
      mostrarToast(error.message, "error");
    }
  }

  return (
    <>
      <Toast toast={toast} onFechar={fecharToast} />

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

        {/* TITULO E BOTAO */}
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
          <Box>
            <Typography variant="h4">Gerenciar Empresas</Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e gerencie todas as empresas cadastradas no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalCadastrarAberta(true)}
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

        {/* LISTAGEM */}
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "75%" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#dddcdc" }}>
              <TableRow>
                <TableCell>
                  <strong>Razão Social</strong>
                </TableCell>
                <TableCell>
                  <strong>CNPJ</strong>
                </TableCell>
                <TableCell>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {empresas
                .filter((empresa) => empresa.ativo)
                .map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>{empresa.razaoSocial}</TableCell>
                    <TableCell>{mask(empresa.cnpj)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          setMenuAncora(e.currentTarget);
                          setMenuEmpresa(empresa);
                        }}
                        sx={{ p: 1, background: "#dddcdc", borderRadius: 2 }}
                      >
                        <FormatListBulletedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={menuAncora}
          open={Boolean(menuAncora)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => setMenuAncora(null)}
        >
          <MenuItem
            onClick={() => {
              abrirEditar(menuEmpresa);
              setMenuAncora(null);
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarDeletar(menuEmpresa);
              setMenuAncora(null);
            }}
          >
            <DeleteIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Deletar
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmarInativar(menuEmpresa);
              setMenuAncora(null);
            }}
          >
            <BlockIcon fontSize="small" color="warning" sx={{ mr: 1 }} />{" "}
            Inativar
          </MenuItem>
          <MenuItem
            onClick={() => {
              setEmpresaParaPsicologos(menuEmpresa);
              setModalPsicologosAberta(true);
              setMenuAncora(null);
            }}
          >
            <PersonSearchIcon fontSize="small" sx={{ mr: 1 }} /> Ver psicólogos
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
