const productsModels = require("../models/productsModels");

async function listarTodos(req, res) {
  try {
    const produtos = await productsModels.listarTodos();

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

async function criar(req, res) {
  try {
    const { nome, preco, qtd_estoque, empresa_id } = req.body;

    if (!nome || !preco || !qtd_estoque || !empresa_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const novoProduto = await productsModels.criar({
      nome,
      preco,
      qtd_estoque,
      empresa_id,
    });

    if (novoProduto) {
      return res.status(201).json(novoProduto);
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao criar o produto",
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "O ID deve ser um número válido " });
    }

    const { nome, preco, qtd_estoque, empresa_id } = req.body;

    if (!nome || !preco || !qtd_estoque || !empresa_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const produtoAtualizado = await productsModels.atualizar(id, {
      nome,
      preco,
      qtd_estoque,
      empresa_id,
    });

    if (produtoAtualizado) {
      return res.status(200).json(produtoAtualizado);
    } else {
      return res.status(404).json({ message: "Produto não encontrado !" });
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao atualizar o produto",
      erro: erro.message,
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "O campo ID deve ser um número válido"});
    }

    const produtoDeletado = await productsModels.deletar(id);

    if (produtoDeletado) {
      return res
        .status(200)
        .json({ message: `Produto de id: ${id} deletado com sucesso` });
    } else {
      return res
        .status(404)
        .json({ message: `Produto de id: ${id} não encontrado !` });
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao deletar a produto",
      erro: erro.message,
    });
  }
}

module.exports = { listarTodos, criar, atualizar, deletar };
