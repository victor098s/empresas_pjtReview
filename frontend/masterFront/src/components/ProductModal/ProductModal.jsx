import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ProductModal.css";

function ProductModal({ setOpenModal }) {
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    quantidade_estoque: "",
    empresa_id: ""
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/products", form);

      alert("Produto cadastrado com sucesso!");

      setOpenModal(false);

      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar produto.");
    }
  }

  return (
    <div className="modal-background">

      <div className="modal-container">

        <div className="modal-header">
          <h2>Cadastrar Produto</h2>

          <button
            className="close-button"
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Nome do Produto</label>

            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Preço</label>

            <input
              type="number"
              step="0.01"
              name="preco"
              value={form.preco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Quantidade em Estoque</label>

            <input
              type="number"
              name="quantidade_estoque"
              value={form.quantidade_estoque}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Fornecedor</label>

            <select
              name="empresa_id"
              value={form.empresa_id}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecione uma empresa
              </option>

              {companies.map((company) => (
                <option
                  key={company.id}
                  value={company.id}
                >
                  {company.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="buttons">

            <button
              type="button"
              className="cancel"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="save"
            >
              Salvar
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductModal;