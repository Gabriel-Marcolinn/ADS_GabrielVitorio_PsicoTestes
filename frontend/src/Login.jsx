import { useNavigate } from "react-router-dom";
import InputEmail from "./components/InputEmail";
import InputPassword from "./components/InputPassword";
import LoginButton from "./components/LoginButton";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <h1>Seja bem vindo ao trabalho Psicotestes!</h1>
      </section>
      <InputEmail />
      <InputPassword />
      <LoginButton />
      <Button variant="contained" onClick={() => navigate("/app")}>
        Botao
      </Button>
    </>
  );
}
