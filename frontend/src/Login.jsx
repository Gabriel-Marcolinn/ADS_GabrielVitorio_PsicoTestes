import InputEmail from "./components/InputEmail";
import InputPassword from "./components/InputPassword";
import LoginButton from "./components/LoginButton";

function Login() {
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

export default Login;