import { useEffect, useState } from "react";
import { obterDashboardPsicologoAdmin } from "../../services/dashboardService";
import { getUsuarioLogado } from "../../services/authService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PersonIcon from "@mui/icons-material/Person";
import { BarChart } from "@mui/x-charts/BarChart";

const KPI_CARDS = [
  {
    key: "psicologosEquipe",
    label: "Psicólogos na Equipe",
    Icon: PeopleAltIcon,
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    key: "testesRealizados",
    label: "Testes Realizados",
    Icon: ContentPasteIcon,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    key: "pacientesAtivos",
    label: "Pacientes Ativos",
    Icon: PersonIcon,
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

const CORES = ["#6366F1", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"];

export default function DashboardPsicologoAdmin() {
  const [dashboard, setDashboard] = useState(null);
  const [desempenhoEquipe, setDesempenhoEquipe] = useState([]);
  const [atividadeMensal, setAtividadeMensal] = useState([]);

  useEffect(() => {
    async function carregar() {
      const usuario = getUsuarioLogado();
      const data = await obterDashboardPsicologoAdmin(usuario?.empresaId);
      setDashboard(data);
      setDesempenhoEquipe(data?.desempenhoEquipe ?? []);
      setAtividadeMensal(data?.atividadeMensal ?? []);
    }
    carregar();
  }, []);

  // Nomes dos psicólogos são chaves dinâmicas no objeto (exceto 'mes')
  const psicologosNomes = [
    ...new Set(
      atividadeMensal.flatMap((m) => Object.keys(m).filter((k) => k !== "mes"))
    ),
  ];

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

      {/* Desempenho por Psicólogo */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Desempenho por Psicólogo
        </Typography>
        <BarChart
          xAxis={[
            {
              data: desempenhoEquipe.map((p) => p.nomePsicologo),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: desempenhoEquipe.map((p) => p.pacientesAtendidos),
              label: "Pacientes Atendidos",
              color: "#6366F1",
            },
            {
              data: desempenhoEquipe.map((p) => p.testesAplicados),
              label: "Testes Aplicados",
              color: "#8B5CF6",
            },
          ]}
          height={300}
        />
      </Paper>

      {/* Atividade Mensal */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Atividade Mensal por Psicólogo
        </Typography>
        <BarChart
          xAxis={[
            {
              data: atividadeMensal.map((m) => m.mes),
              scaleType: "band",
            },
          ]}
          series={psicologosNomes.map((nome, i) => ({
            data: atividadeMensal.map((m) => m[nome] ?? 0),
            label: nome,
            color: CORES[i % CORES.length],
          }))}
          height={300}
        />
      </Paper>
    </Box>
  );
}
