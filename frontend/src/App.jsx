import RedirectButton from "./components/RedirectButton";

function App() {
  return (
    <>
      <h1>Você está logado! Bem vindo ao app.</h1>

      <RedirectButton to="/empresas" text="Empresas" />
    </>
  );
}

export default App;
