const pool = require("../config/database");

async function listarTodos() {
  const sql = `SELECT * FROM products`;
  const result = await pool.query(sql);

  return result.rows;
}

async function criar(dados) {
  const { nome, preco, qtd_estoque, empresa_id } = dados;

  const sql = `INSERT INTO products(nome, preco, qtd_estoque, empresa_id) values ($1, $2, $3, $4) RETURNING *`;
  const result = await pool.query(sql, [nome, preco, qtd_estoque, empresa_id]);
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, preco, qtd_estoque, empresa_id } = dados;

  const sql = `UPDATE products SET nome = $1, preco = $2, qtd_estoque = $3, empresa_id= $4 WHERE id_prod= $5 RETURNING *`;

  const result = await pool.query(sql, [
    nome,
    preco,
    qtd_estoque,
    empresa_id,
    id,
  ]);

  return result.rows[0];
}

async function deletar(id) {
  const sql = `DELETE FROM products WHERE id_prod = $1 RETURNING *`;
  const result = await pool.query(sql, [id]);

  return result.rowCount > 0;
}

module.exports = { listarTodos, criar, atualizar, deletar };
