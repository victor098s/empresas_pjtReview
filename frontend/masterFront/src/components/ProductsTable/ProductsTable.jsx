import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ProductsTable.css";

function ProductsTable() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {

    const confirmDelete = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/products/${id}`);

      setProducts(products.filter(product => product.id !== id));

      alert("Produto excluído com sucesso!");

    } catch (error) {

      console.log(error);

      alert("Erro ao excluir produto.");

    }

  }

  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.nome}</td>

              <td>
                R$ {Number(product.preco).toFixed(2)}
              </td>

              <td>{product.quantidade_estoque}</td>

              <td>{product.empresa_nome}</td>

              <td className="actions">

                <button className="edit-btn">
                  Editar
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductsTable;