import { useState } from 'react'
import './App.css';
import Home from './pages/home';
import Sobre from './pages/sobre';
import Galeria from './pages/galeria';
import ComponenteExemplo from './components/componenteExemplo';

function App() {
  const [PaginaAtual, setPaginaAtual] = useState(Home) // #########

  function irParaHome() { setPaginaAtual(Home) }

  function irParaSobre() { setPaginaAtual(Sobre) }

  function irParaGaleria() { setPaginaAtual(Galeria) }

  return (
    <>
      <div style={{ margin: "0 auto 20px auto"}}>
        <a className="page-link" onClick={irParaHome}>Home</a>
        <a className="page-link" onClick={irParaGaleria}>Galeria</a>
        <a className="page-link" onClick={irParaSobre}>Sobre</a>
      </div>
      {PaginaAtual}
      <ComponenteExemplo conteudo="Conteúdo de exemplo" />
    </>
  )
}

export default App
