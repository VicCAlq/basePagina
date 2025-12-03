##  Configuração inicial do projeto
As instruções deste guia devem ser executadas em um terminal do Git Bash:

Como rodar o backend:
1. Abra um terminal do Git Bash
2. Navegue para a pasta `backend` com `cd backend`
3. Instale as dependências do servidor utilizando o Node com o comando `npm install`
    - A lista de dependências se encontra no arquivo `package.json`
4. Execute o servidor com o comando `npm run dev`

Como rodar o frontend:
1. Abra outro terminal do Git Bash para rodar o cliente.
2. Navegue para a pasta `frontend` com `cd frontend`
3. Instale as dependências do projeto utilizando o Node com o comando `npm install`
    - A lista de dependências se encontra no arquivo `package.json`
4. Execute o cliente com o comando `npm run dev`
5. Acesse o endereço `http://localhost:3000`

##  Para rodar novamente após encerrado

Dentro da pasta do projeto, execute os comandos abaixo em dois terminais diferentes, um com a pasta `frontend` aberta, e outro com a pasta `backend` aberta.

1. `npm install`
2. `npm run dev`

Tudo dando certo, o site estará acessível em `http://localhost:3000`
