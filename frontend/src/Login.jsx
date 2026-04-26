import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(data) {
    console.log(data);
    navigate("/empresas");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 600, borderRadius: 3 }}>
        <Typography
          sx={{ textAlign: "center" }}
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Seja bem vindo ao Psicotestes!
        </Typography>

        <Box
          sx={{ flexDirection: "column" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          gap={2}
        >
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            {...register("senha")}
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "👁️" : "🙈"}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
