import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { listarPacientes } from "../../../services/pacienteService";

export default function ModalListarPacientesDoPsicologo({
  aberta,
  onFechar,
  psicologo,
}) {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (aberta && psicologo) {
      listarPacientes(psicologo.id).then(setPacientes).catch(console.error);
    }
  }, [aberta, psicologo]);

  return (
    <Dialog open={aberta} onClose={onFechar}>
      <DialogTitle>
        Pacientes de <strong>{psicologo?.nome}</strong>
      </DialogTitle>
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
          {pacientes.length === 0 ? (
            <Typography color="text.secondary">
              Nenhum paciente vinculado
            </Typography>
          ) : (
            pacientes.map((p) => (
              <Box
                key={p.id}
                sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}
              >
                <Typography>
                  <strong>{p.nome}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.email}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
