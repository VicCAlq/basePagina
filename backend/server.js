const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const { Database } = require('sqlite3');
const app = express();
const PORTA = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./assinantes.db', (erro) => {
  if (erro) {
    console.error('Erro ao abrir o banco de dados "assinantes.db":', erro.message);
  } else {
    console.log('Conectado ao banco de dados SQLite3 "assinantes.db"');
    
    db.run(`CREATE TABLE IF NOT EXISTS Assinantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email VARCHAR(200) NOT NULL UNIQUE,
      dataCriacao VARCHAR(200),
      mensagens TEXT
    )`, (erro) => {
      if (erro) {
        console.error('Erro ao criar a tabela "Assinantes"', erro.message);
      } else {
        console.log('Tabela "Assinantes" pronta!');
      }
    });
  }
});

app.get('/api/assinantes', (req, res) => {
  const sql = 'SELECT * FROM Assinantes';
  db.all(sql, [], (erro, linhasDaTabela) => {
    if (erro) {
      res.status(400).json({ error: erro.message });
      return;
    }
    res.json({
      message: 'success',
      data: linhasDaTabela
    });
  });
});

app.get('/api/assinantes/:id', (req, res) => {
  const sql = 'SELECT * FROM Assinantes WHERE id = ?';
  const params = [req.params.id];
  db.get(sql, params, (erro, linhaDaTabela) => {
    if (erro) {
      res.status(400).json({ error: erro.message });
      return;
    }
    if (!linhaDaTabela) {
      res.status(404).json({ error: 'Item não encontrado' });
      return;
    }
    res.json({
      message: 'success',
      data: linhaDaTabela
    });
  });
});

app.post('/api/assinantes', (req, res) => {
  const { nome, email, dataCriacao, mensagens } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: 'O nome e email são obrigatórios' });
  }
  const sql = `INSERT INTO Assinantes ( nome, email, dataCriacao, mensagens) VALUES (?, ?, ?, ?)`;
  const params = [ nome, email, dataCriacao, JSON.stringify(mensagens) ];
  db.run(sql, params, function(erro) {
    if (erro) { 
      if (erro.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ 
          error: 'Este email já está cadastrado' 
        });
      }
      res.status(500).json({ error: erro.message });
      return;
    }
    res.status(201).json({
      message: 'Assinante adicionado com sucesso',
      data: { id: this.lastID },
      id: this.lastID
    });
  });
});

app.put('/api/assinantes/:id', (req, res) => {
  const { nome, email, dataCriacao, mensagens } = req.body;
  const sql = `UPDATE Assinantes SET 
    nome = ?,
    email = ?,
    dataCriacao = ?,
    mensagens = ?,
    WHERE id = ?`;
  const params = [ nome, email, dataCriacao, JSON.stringify(mensagens), req.params.id ];
  db.run(sql, params, function(erro) {
    if (erro) {
      res.status(400).json({ error: erro.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Assinante não encontrado' });
      return;
    }
    res.status(201).json({
      message: 'Assinante atualizado com sucesso',
      data: { id: req.params.id },
      changes: this.changes
    });
  });
});

app.delete('/api/assinantes/:id', (req, res) => {
  const sql = 'DELETE FROM Assinantes WHERE id = ?';
  const params = [req.params.id];
  db.run(sql, params, function(erro) {
    if (erro) {
      res.status(400).json({ error: erro.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Assinante não encontrado' });
      return;
    }
    res.status(201).json({
      message: 'Assinante apagado com sucesso.',
      changes: this.changes
    });
  });
});

app.use((erro, req, res, next) => {
  console.error(erro.stack);
  res.status(500).json({ error: 'Erro em alguma das ferramentas de middleware' });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});
app.listen(PORTA, () => {
  console.log(`Servidor executando com sucesso no endereço http://localhost:${PORTA}`);
});
process.on('SIGINT', () => {
  db.close((erro) => {
    if (erro) {
      console.error(erro.message);
    }
    console.log('Conexão com o banco de dados encerrada com sucesso.');
    process.exit(0);
  });
});
