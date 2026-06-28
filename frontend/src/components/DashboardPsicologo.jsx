import { useEffect, useState } from "react";
import { obterDashboardPsicologo } from "../../services/dashboardService";
import { getUsuarioLogado } from "../../services/authService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { BarChart } from "@mui/x-charts";

const KPI_CARDS = [
  {
    key: "pacientesCadastrados",
    label: "Pacientes Cadastrados",
    Icon: PersonIcon,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    key: "testesAplicados",
    label: "Testes Aplicados",
    Icon: ContentPasteIcon,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

export default function DashboardPsicologo() {
  const [dashboard, setDashboard] = useState(null);
  const [testesPorInstrumento, setTestesPorInstrumento] = useState([]);

  useEffect(() => {
    async function carregar() {
      const usuario = getUsuarioLogado();
      const data = await obterDashboardPsicologo(usuario?.id);
      setDashboard(data);
      setTestesPorInstrumento(data?.testesPorInstrumento ?? []);
      console.log(data);
    }
    carregar();
  }, []);

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
      {/* KPI Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        {KPI_CARDS.map(({ key, label, Icon, color, bg }) => (
          <Paper key={key} sx={{ flex: "1 1 180px", p: 2.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                backgroundColor: bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <Icon sx={{ color, fontSize: 22 }} />
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="text.primary"
              lineHeight={1}
            >
              {dashboard?.kpis?.[key] ?? "—"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Testes por Instrumento */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Testes por Instrumento
        </Typography>
        <BarChart
          xAxis={[
            {
              data: testesPorInstrumento.map((t) => t.nomeTeste),
              scaleType: "band",
              label: "Teste",
            },
          ]}
          series={[
            {
              data: testesPorInstrumento.map((t) => t.quantidade),
              label: "Quantidade",
              color: "#6366F1",
            },
          ]}
          height={300}
        />
      </Paper>
    </Box>
  );
}
