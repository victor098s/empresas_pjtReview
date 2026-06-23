import "./StatsCards.css";

function StatsCards() {

  return (

    <div className="cards">

      <div className="card">

        <p>Total de Produtos</p>

        <h1>1248</h1>

      </div>

      <div className="card">

        <p>Itens com Estoque Baixo</p>

        <h1>42</h1>

      </div>

      <div className="card">

        <p>Valor Total do Inventário</p>

        <h1>R$ 485k</h1>

      </div>

      <div className="card">

        <p>Fornecedores Ativos</p>

        <h1>18</h1>

      </div>

    </div>

  );
}

export default StatsCards;