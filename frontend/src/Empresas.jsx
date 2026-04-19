import { useEffect, useState } from "react";
import { listarEmpresas } from "../services/empresaService";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);

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
    </>
  );
}
