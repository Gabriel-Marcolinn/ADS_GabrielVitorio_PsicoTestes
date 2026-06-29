import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService";

export default function ModalListarAlternativas({
  aberta,
  onFechar,
  aplicacaoId,
}) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (aberta && aplicacaoId) {
      setCarregando(true);
<<<<<<< HEAD
      fetch(`https://adsgabrielvitoriopsicotestes-production.up.railway.app/api/aplicacoes/${aplicacaoId}`, {
=======
      fetch(`/api/aplicacoes/${aplicacaoId}`, {
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
        headers: getAuthHeaders(),
      })
        .then((r) => r.json())
        .then(setDados)
        .catch(console.error)
        .finally(() => setCarregando(false));
    } else {
      setDados(null);
    }
  }, [aberta, aplicacaoId]);

  return (
    <Dialog open={aberta} onClose={onFechar} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dados && (
          <Typography variant="subtitle2" color="text.secondary">
            {dados.nomeTeste} — {dados.nomePaciente} —{" "}
            {new Date(dados.data).toLocaleDateString("pt-BR")}
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <ChecklistIcon fontSize="small" />
          <Typography variant="h6" fontWeight="bold">
            Respostas do Questionário
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {carregando && <Typography>Carregando...</Typography>}
        {!carregando && dados && dados.respostas.length === 0 && (
          <Typography color="text.secondary">
            Nenhuma resposta registrada.
          </Typography>
        )}
        {!carregando &&
          dados &&
          dados.respostas.map((r) => (
            <Box
              key={r.id}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {r.descricaoPergunta}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  mt: 1,
                }}
              >
                <Typography fontWeight="bold">
                  {r.alternativaMarcada.descricao}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "nowrap", ml: 2 }}
                >
                  {r.alternativaMarcada.pontuacao}{" "}
                  {r.alternativaMarcada.pontuacao === 1 ? "ponto" : "pontos"}
                </Typography>
              </Box>
            </Box>
          ))}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onFechar}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
