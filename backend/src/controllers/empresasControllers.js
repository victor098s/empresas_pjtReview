const empresasModels = require("../models/empresasModels");

async function listarTodos(req, res) {
  try {
    const empresas = await empresasModels.listarTodos();

    if (empresas) {
      res.status(200).json(empresas);
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao listar as empresas",
      erro: erro.message,
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, cnpj, telefone } = req.body;

    if (!nome || !cnpj || !telefone) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const novaEmpresa = await empresasModels.criar({
      nome,
      cnpj,
      telefone,
    });

    if (novaEmpresa) {
      return res.status(201).json(novaEmpresa);
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao criar a empressa",
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "O ID deve ser informado" });
    }

    const { nome, cnpj, telefone } = req.body;

    if (!nome || !cnpj || !telefone) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const empresaAtualizada = await empresasModels.atualizar({
      nome,
      cnpj,
      telefone,
    });

    if (empresaAtualizada) {
      return res.status(200).json(empresaAtualizada);
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao atualizar a empressa",
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
        .json({ message: "O campo ID deve ser preenchido" });
    }

    const empresaDeletada = await empresasModels.deletar(id);

    if (empresaDeletada) {
      res
        .status(200)
        .json({ message: `Produto de id: ${id} deletado com sucesso` });
    } else {
      res
        .status(404)
        .json({ message: `Produto de id: ${id} não encontrado !` });
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao deletar a empresa",
      erro: erro.message,
    });
  }
}

module.exports = { listarTodos, criar, atualizar, deletar };
