import "./StatsCards.css";

function StatsCards({ products }) {
  const totalProducts = products.length;
  const lowStockItems = products.filter((product) => Number(product.qtd_estoque) <= 10).length;
  const inventoryValue = products.reduce((total, product) => {
    const price = Number(product.preco) || 0;
    const quantity = Number(product.qtd_estoque) || 0;
    return total + price * quantity;
  }, 0);
  const activeSuppliers = new Set(
    products
      .map((product) => product.empresa_id || product.empresa_nome)
      .filter(Boolean)
  ).size;

  return (
    <div className="cards">
      <div className="card">
        <p>Total de Produtos</p>
        <h1>{totalProducts}</h1>
      </div>

      <div className="card">
        <p>Itens com Estoque Baixo</p>
        <h1>{lowStockItems}</h1>
      </div>

      <div className="card">
        <p>Valor Total do Inventario</p>
        <h1>
          {inventoryValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2,
          })}
        </h1>
      </div>

      <div className="card">
        <p>Fornecedores Ativos</p>
        <h1>{activeSuppliers}</h1>
      </div>
    </div>
  );
}

export default StatsCards;
