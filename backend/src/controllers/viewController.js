const viewModels = require("../models/viewModels");

async function listarTodos(req, res) {
  try {
    const produtos = await viewModels.listarTodos();

    if (produtos) {
      res.status(200).json(produtos);
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao listar os produtos",
      erro: erro.message,
    });
  }
}

module.exports = { listarTodos};
