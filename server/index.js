const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuração do banco de dados
const pool = new Pool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT || 5432,
  ssl: {
    rejectUnauthorized: false // Esta configuração pode ser ajustada conforme necessário
  }
});

// Verificação das variáveis de ambiente
console.log({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT
});

// Testar a conexão com o banco de dados
pool.connect()
  .then(client => {
    console.log('Conectado ao banco de dados PostgreSQL.');
    client.release(); // Liberar o cliente de volta para o pool
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Rota para buscar dados
app.get('/dados', async (req, res) => {
  console.log('Recebida requisição para /dados');
  try {
    const results = await Promise.all([
      pool.query('SELECT * FROM Usuarios ORDER BY data_e_hora DESC LIMIT 1'),
      pool.query('SELECT * FROM SalaDeEstar ORDER BY data_e_hora DESC LIMIT 1'),
      pool.query('SELECT * FROM Quarto ORDER BY data_e_hora DESC LIMIT 1'),
      pool.query('SELECT * FROM Cozinha ORDER BY data_e_hora DESC LIMIT 1'),
      pool.query('SELECT * FROM Banheiro ORDER BY data_e_hora DESC LIMIT 1'),
      pool.query('SELECT * FROM Escritorio ORDER BY data_e_hora DESC LIMIT 1')
    ]);

    const data = {
      usuarios: results[0].rows,
      salaDeEstar: results[1].rows,
      quarto: results[2].rows,
      cozinha: results[3].rows,
      banheiro: results[4].rows,
      escritorio: results[5].rows
    };

    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});


// Rota para inserir/atualizar dados
app.post('/config', async (req, res) => {
  console.log('Recebida requisição para /config', req.body);
  const { minTemp, maxTemp, minUR, maxUR } = req.body;

  const query = `
    INSERT INTO configuracoes (id, min_temp, max_temp, min_ur, max_ur)
    VALUES (1, $1, $2, $3, $4)
    ON CONFLICT (id) DO UPDATE SET
      min_temp = EXCLUDED.min_temp,
      max_temp = EXCLUDED.max_temp,
      min_ur = EXCLUDED.min_ur,
      max_ur = EXCLUDED.max_ur
  `;

  const values = [minTemp, maxTemp, minUR, maxUR];

  try {
    await pool.query(query, values);
    res.status(200).json({ message: 'Configurações atualizadas com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar configurações:', err);
    res.status(500).json({ error: 'Erro ao atualizar configurações' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
