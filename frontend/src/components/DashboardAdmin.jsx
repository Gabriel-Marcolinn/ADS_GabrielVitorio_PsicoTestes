import { useEffect, useState } from "react";
import { obterDashboardAdmin } from "../../services/dashboardService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BusinessIcon from "@mui/icons-material/Business";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { BarChart } from "@mui/x-charts/BarChart";

const KPI_CARDS = [
  {
    key: "psicologosAtivos",
    label: "Psicólogos Ativos",
    Icon: PeopleAltIcon,
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    key: "testesAplicados",
    label: "Testes Aplicados",
    Icon: ContentPasteIcon,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    key: "totalEmpresas",
    label: "Total de Empresas",
    Icon: BusinessIcon,
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [empresasDesempenho, setEmpresasDesempenho] = useState([]);
  const [empresasTestes, setEmpresasTestes] = useState([]);

  useEffect(() => {
    async function carregar() {
      const data = await obterDashboardAdmin();
      setDashboard(data);
      setEmpresasDesempenho(data?.desempenhoEmpresas ?? []);
      setEmpresasTestes(data?.distribuicaoTestes ?? []);
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

      {/* Desempenho por Empresa */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Desempenho por Empresa
        </Typography>
        <BarChart
          xAxis={[
            {
              data: empresasDesempenho.map((e) => e.nomeEmpresa),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: empresasDesempenho.map((e) => e.pacientesAtendidos),
              label: "Pacientes Atendidos",
              color: "#6366F1",
            },
            {
              data: empresasDesempenho.map((e) => e.testesAplicados),
              label: "Testes Aplicados",
              color: "#8B5CF6",
            },
          ]}
          height={300}
        />
      </Paper>

      {/* Distribuição de Testes */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Distribuição de Testes por Empresa
        </Typography>
        <BarChart
          xAxis={[
            {
              data: empresasTestes.map((e) => e.nomeEmpresa),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: empresasTestes.map(
                (e) => e.quantidadeAplicadaEscaladeIdeaoSuicidaBECKBSS,
              ),
              label: "BSS",
              color: "#EF4444",
            },
            {
              data: empresasTestes.map(
                (e) =>
                  e.quantidadeAplicadaInventriodeDepressodeBeckSegundaEdioBDIII,
              ),
              label: "BDI-II",
              color: "#F59E0B",
            },
            {
              data: empresasTestes.map((e) => e.quantidadeAplicadaWHOQOLBREF),
              label: "WHOQOL-BREF",
              color: "#10B981",
            },
          ]}
          height={300}
        />
      </Paper>
    </Box>
  );
}
