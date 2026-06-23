const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
});

pool.connect((erro, client, release) => {
  if (erro) {
    console.error("Erro ao conectar-se ao PostGreSQL ❌", erro);
  } else {
    console.log("Conectado com sucesso ao PostGreSQL ✅");
    release();
  }
});

module.exports = pool;
