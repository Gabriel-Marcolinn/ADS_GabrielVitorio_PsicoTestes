import { useState } from "react";

export default function InputPassword() {
  const [type, setType] = useState("password");

  function changeType() {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  return(
<div>
    <label htmlFor="password">Senha: </label>

    <input type={type} placeholder="Digite sua senha" />
    <button onClick={changeType}>Ver</button>
</div>

  );
}
