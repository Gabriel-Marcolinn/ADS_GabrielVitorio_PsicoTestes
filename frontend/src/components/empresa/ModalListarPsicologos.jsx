import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ModalListarPacientesDoPsicologo from "./ModalListarPacientesDoPsicologo";
import Button from "@mui/material/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import IconButton from "@mui/material/IconButton";

export default function ModalListarPsicologos({ aberta, onFechar, empresa }) {
  const [psicologos, setPsicologos] = useState([]);
  const [modalPacientesAberta, setModalPacientesAberta] = useState(false);
  const [psicologoSelecionado, setPsicologoSelecionado] = useState(null);

  const TIPO_LABELS = {
    AD: { label: "Administrador", color: "primary" },
    PS: { label: "Psicólogo", color: "success" },
    PA: { label: "Psicólogo Administrador", color: "warning" },
  };

  useEffect(() => {
    if (aberta && empresa) {
      fetch(
        `http://localhost:8080/api/usuarios?empresaId=${empresa.id}&ativo=true`,
        { headers: getAuthHeaders() },
      )
        .then((r) => r.json())
        .then(setPsicologos)
        .catch(console.error);
    }
  }, [aberta, empresa]);

  return (
    <Box>
      {modalPacientesAberta && (
        <ModalListarPacientesDoPsicologo
          aberta={modalPacientesAberta}
          onFechar={() => setModalPacientesAberta(false)}
          psicologo={psicologoSelecionado}
        />
      )}
      <Dialog open={aberta} onClose={onFechar}>
        <DialogTitle>
          Psicólogos - <strong>{empresa.razaoSocial}</strong>
        </DialogTitle>
        <Typography variant="caption" color="text.secondary" sx={{ px: 3 }}>
          {psicologos.length} psicólogos cadastrados
        </Typography>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
              minWidth: 400,
            }}
          >
            {psicologos.length === 0 ? (
              <Typography color="text.secondary">
                Nenhum psicólogo cadastrado
              </Typography>
            ) : (
              psicologos.map((p) => (
                <Box
                  key={p.id}
                  sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>
                          <strong>{p.nome}</strong>
                        </Typography>
                        <Chip
                          label={TIPO_LABELS[p.tipo]?.label ?? p.tipo}
                          color={TIPO_LABELS[p.tipo]?.color ?? "default"}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      <Typography>{p.email}</Typography>
                    </Box>
                    {(p.tipo === "PA" || p.tipo === "PS") && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setPsicologoSelecionado(p);
                          setModalPacientesAberta(true);
                        }}
                      >
                        <PersonSearchIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
