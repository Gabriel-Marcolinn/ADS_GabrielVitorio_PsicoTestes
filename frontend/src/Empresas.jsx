import { useEffect, useState } from "react";
import { listarEmpresas } from "../services/empresaService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarEmpresas().then(setEmpresas);
  }, []);

  return (
    <>
      <h1>Empresas cadastradas: </h1>
      {empresas.map((empresa) => (
        <p key={empresa.id}>
          {empresa.razaoSocial} - {empresa.cnpj}
        </p>
      ))}

      <Button variant="contained" onClick={() => navigate("./cadastro")}>
        Cadastrar empresa
      </Button>
    </>
  );
}
