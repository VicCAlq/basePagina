// Leiam os comentários, eles contém explicações sobre cada parte da classe
export default class PessoaInscrita { // Criamos objetos usando: let objeto = new PessoaInscrita("mensagem do email", new Date("ano-mês-dia"))
  nome: string | null // tipo texto ou nulo
  email: string | null // tipo texto ou nulo
  idade: number | null
  apelido: string | null // tipo texto ou nulo
  dataCriacao: Date | null // tipo Date (objeto de datas) ou nulo
  mensagens: { mensagem: string, data: Date}[] | null // lista de objetos com mensagem e data ou nulo

  constructor(nome: string, apelido: string, email: string, idade: number) { // Aqui o construtor é o que já vimos antes
    this.nome = nome
    this.apelido = apelido
    this.email = email
    this.idade = idade
    this.dataCriacao = new Date() // new Date() vazio cria uma data a partir do momento atual
    this.mensagens = [] // Queremos que cada usuário comece com uma lista de mensagens vazia
  }

  apagarDados() { // Método para apagar os dados do usuário
    for(let chave in this) { // Para cada propriedade/chave dentro de "this"
      // @ts-ignore // Coloquem este comentário para suprimir um alerta do Typescript
      this[chave] = null // Atribuímos o valor "nulo" para a propriedade
    }
  }

  agendarMensagem(mensagem: string, data: Date) { // Método para agendar mensagens
    if (this.mensagens) { // Verificação de que this.mensagens não é "nulo"
      this.mensagens.push({ mensagem: mensagem, data: data}) // Novo objeto enviado para mensagens
    }
  }
}

// EDIT: Criem duas propriedades adicionais para a classe (idade, nome no Discord, apelido, etc. Sejam criativos)
