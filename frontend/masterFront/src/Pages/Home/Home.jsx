import { useEffect, useState } from "react";
import styles from "./Home.module.css";

function Home() {
  const [dashboardData, setDashboardData] = useState({
    titulo: "Bem-vindo, Administrador",
    descricao:
      "Gerencie empresas, produtos e pedidos através deste painel administrativo.",
    empresas: 1284,
    produtos: 45902,
    pedidos: 156,
    parcerias: 5000,
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("dashboardData");

    if (dadosSalvos) {
      setDashboardData(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dashboardData",
      JSON.stringify(dashboardData)
    );
  }, [dashboardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDashboardData({
      ...dashboardData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>{dashboardData.titulo}</h1>
        <p>{dashboardData.descricao}</p>
      </section>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h4>Empresas Cadastradas</h4>
          <h2>{dashboardData.empresas}</h2>
        </div>

        <div className={styles.card}>
          <h4>Produtos Ativos</h4>
          <h2>{dashboardData.produtos}</h2>
        </div>

        <div className={styles.card}>
          <h4>Pedidos Pendentes</h4>
          <h2>{dashboardData.pedidos}</h2>
        </div>

        <div className={styles.card}>
          <h4>Parcerias</h4>
          <h2>{dashboardData.parcerias}</h2>
        </div>
      </section>

      <section className={styles.adminPanel}>
        <h2>Editar Dashboard</h2>

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={dashboardData.titulo}
          onChange={handleChange}
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={dashboardData.descricao}
          onChange={handleChange}
        />

        <input
          type="number"
          name="empresas"
          placeholder="Empresas"
          value={dashboardData.empresas}
          onChange={handleChange}
        />

        <input
          type="number"
          name="produtos"
          placeholder="Produtos"
          value={dashboardData.produtos}
          onChange={handleChange}
        />

        <input
          type="number"
          name="pedidos"
          placeholder="Pedidos"
          value={dashboardData.pedidos}
          onChange={handleChange}
        />

        <input
          type="number"
          name="parcerias"
          placeholder="Parcerias"
          value={dashboardData.parcerias}
          onChange={handleChange}
        />
      </section>
    </div>
  );
}

export default Home;