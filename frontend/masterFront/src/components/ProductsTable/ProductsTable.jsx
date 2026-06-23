import { productService } from "../../services/productService";
import "./ProductsTable.css";

function ProductsTable({ products, setProducts, loading, error }) {
  async function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmDelete) return;

    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((product) => product.id_prod !== id));
      alert("Produto excluido com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir produto.");
    }
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preco</th>
            <th>Quantidade em Estoque</th>
            <th>Fornecedor</th>
            <th>Acoes</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="5">Carregando produtos...</td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan="5">{error}</td>
            </tr>
          )}

          {!loading && !error && products.length === 0 && (
            <tr>
              <td colSpan="5">Nenhum produto encontrado.</td>
            </tr>
          )}

          {!loading && !error && products.map((product) => (
            <tr key={product.id_prod}>
              <td>{product.nome}</td>

              <td>R$ {Number(product.preco).toFixed(2)}</td>

              <td>{product.qtd_estoque}</td>

              <td>{product.empresa_nome || product.empresa_id}</td>

              <td className="actions">
                <button className="edit-btn">
                  Editar
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product.id_prod)}
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
