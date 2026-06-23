import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import "./ProductModal.css";

function ProductModal({ setOpenModal, onProductCreated }) {
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    qtd_estoque: "",
    empresa_id: ""
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      setLoadingCompanies(true);
      const companiesData = await productService.getCompanies();
      setCompanies(companiesData);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar empresas.");
    } finally {
      setLoadingCompanies(false);
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
      await productService.createProduct(form);
      await onProductCreated();
      alert("Produto cadastrado com sucesso!");
      setOpenModal(false);
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
            <label>Preco</label>

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
              name="qtd_estoque"
              value={form.qtd_estoque}
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
              disabled={loadingCompanies}
            >
              <option value="">
                {loadingCompanies ? "Carregando empresas..." : "Selecione uma empresa"}
              </option>

              {companies.map((company) => (
                <option
                  key={company.id_emp}
                  value={company.id_emp}
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
