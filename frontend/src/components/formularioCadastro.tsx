import { useState, type FormEvent } from 'react'
import PessoaInscrita from '../models/classPessoaInscrita'

export default function FormularioCadastro() {
  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })

  /** Função que exibe mensagens de sucesso ou erro */
  function exibirMensagem(tipo:string, texto:string) {
    setMensagem({ tipo, texto })
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 5000)
  }

  /** Função que envia o assinante preenchido no formulário */
  async function enviar(evento: FormEvent) {
    /** Aqui impedimos o site de recarregar ao enviar o formulário */
    evento.preventDefault()
    
    /** Se nome ou email não forem preenchidos, exibe mensagem de erro */
    if (!nome.trim() || !email.trim()) {
      exibirMensagem('erro', 'Por favor, preencha todos os campos')
      return
    }

    /** Criamos um objeto para o nosso assinante com a classe PessoaInscrita */
    const assinante  = new PessoaInscrita(nome, email)
    /** Anexamos uma mensagem padrão para o novo assinante */
    assinante.agendarMensagem("Bem-vindo! Obrigado por seguir nosso jogo!", new Date())
    console.log(assinante)

    /** Ativamos o estado de carregamento */
    setLoading(true)

    try {
      const response = await fetch('/api/assinantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assinante),
      })

      const data = await response.json()

      if (response.ok) {
        exibirMensagem('success', data.message)
        setNome('')
        setEmail('')
      } else {
        exibirMensagem('erro', data.error || 'Erro ao cadastrar visitante')
      }
    } catch (error) {
      exibirMensagem('erro', 'Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return(
    <section className="secao-formulario">
      {mensagem.texto && (
        <div className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}
      <form onSubmit={enviar} id="formulario">
        <div className="grupo-formulario">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="input-nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Exemplivaldo Demonstracildo Moureira"
            disabled={loading}
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="input-email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="meu_exemplo@aqui.com"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastre-se'}
        </button>
      </form>
    </section>
  )
}
