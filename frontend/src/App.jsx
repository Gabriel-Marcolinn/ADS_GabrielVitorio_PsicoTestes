import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Button from "./components/LoginButton";
import LoginButton from "./components/LoginButton";
import InputEmail from "./components/InputEmail";
import InputPassword from "./components/InputPassword";

function App() {
  return (
    <>
      <section>
        <h1>Seja bem vindo ao trabalho Psicotestes!</h1>
      </section>
      
      <InputEmail />
      
      <InputPassword />
      
      <LoginButton />
    
    </>
  );
}

export default App;
