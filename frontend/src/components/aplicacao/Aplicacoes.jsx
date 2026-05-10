import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Aplicacoes() {
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
          <Typography variant="h4">Gerenciar Aplicacoes</Typography>
          <Typography variant="body2" color="text.secondary">
            Visualize e gerencie todas as aplicacoes cadastradas no sistema
          </Typography>
        </Box>
        {/* COLOCAR AQUI O BOTAO PRA CADASTRAR APLICACAO*/}
      </Box>
    </Box>
  );
}
