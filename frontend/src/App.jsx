import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Você está logado! Bem vindo ao app.</h1>
      <Button variant="contained" onClick={() => navigate("/empresas")}>
        Empresas
      </Button>
    </>
  );
}

export default App;
