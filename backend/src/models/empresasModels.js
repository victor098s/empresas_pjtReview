const pool = require("../config/database");

async function listarTodos() {
  const sql = `SELECT * FROM companies`;
  const result = await pool.query(sql);

  return result.rows;
}

async function criar(dados) {
  const { nome, cnpj, telefone } = dados;

  const sql = `INSERT INTO companies(nome, cnpj, telefone) values ($1, $2, $3) RETURNING *`;
  const result = await pool.query(sql, [nome, cnpj, telefone]);
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, cnpj, telefone } = dados;

  const sql = `UPDATE companies SET nome = $1, cnpj = $2, telefone = $3 WHERE id_emp= $4 RETURNING *`;

  const result = await pool.query(sql, [nome, cnpj, telefone, id]);

  return result.rows[0];
}

async function deletar(id) {
  const sql = `DELETE FROM companies WHERE id_emp = $1 RETURNING *`;
  const result = await pool.query(sql, [id]);

  return result.rowCount > 0;
}

module.exports = { listarTodos, criar, atualizar, deletar };
