const pool = require("../config/database");

async function listarTodos() {
  const sql = `SELECT * FROM viewProd`;
  const result = await pool.query(sql);

  return result.rows;
}

module.exports = { listarTodos, criar, atualizar, deletar };
