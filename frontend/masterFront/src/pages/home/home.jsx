import banner from "../../assets/IMG/home-header.png";
import appleLogo from "../../assets/IMG/apple-logo.jpeg";
import boschLogo from "../../assets/IMG/bosch-logo.png";
import sephoraLogo from "../../assets/IMG/sephora-logo.png";
import vansLogo from "../../assets/IMG/vans-logo.jpg";
import styles from "./home.module.css";
import construcao from "../../assets/IMG/construcao.png";
import compras from "../../assets/IMG/compras.png";
import concluido from "../../assets/IMG/concluido.png";

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.logo}>RedBear Companies</h1>

        <nav className={styles.nav}>
          <a href="/empresas">Empresas</a>
          <a href="/produtos">Produtos</a>
          <button className={styles.btnSair}>Sair</button>
        </nav>
      </header>

      <main className={styles.content}>
        <section className={styles.banner}>
          <img src={banner} alt="Banner RedBear" />
        </section>

        <section className={styles.stats}>
          <div className={styles.card}>
            <img src={construcao} alt="construcao" />
            <span className={styles.badge}>+12% vs ano ant.</span>
            <h4>TOTAL DE EMPRESAS REGISTRADAS</h4>
            <h2>1.284</h2>
          </div>

          <div className={styles.card}>
            <img src={compras} alt="compras" />
            <span className={styles.badge}>8 novos esta semana</span>
            <h4>TOTAL DE PRODUTOS ATIVOS</h4>
            <h2>45.902</h2>
          </div>

          <div className={styles.card}>
            <img src={concluido} alt="concluido" />
            <span className={`${styles.badge} ${styles.danger}`}>
              Alta Prioridade
            </span>
            <h4>PEDIDOS PENDENTES</h4>
            <h2>156</h2>
          </div>
        </section>

        <section className={styles.missao}>
          <span>SOBRE NÓS</span>
          <h2>Eficiência através da conexão.</h2>
          <p>
            A RedBear Companies foi fundada para preencher a lacuna entre
            fornecedores de classe mundial e mercados de alta demanda. Nossa
            plataforma utiliza análises de dados avançadas e rastreamento em
            tempo real para garantir que o produto certo chegue às mãos certas,
            exatamente quando necessário. Somos mais que um sistema de gestão;
            somos a rede neural da sua cadeia de suprimentos.
          </p>
        </section>

        <section className={styles.parceiras}>
          <h2>Empresas Parceiras</h2>

          <div className={styles.empresasGrid}>
            <div className={styles.empresaCard}>
              <img src={appleLogo} alt="Global Logistics" />
              <h3>Apple</h3>
              <p>Tecnologia</p>
            </div>

            <div className={styles.empresaCard}>
              <img src={boschLogo} alt="TechSupply" />
              <h3>Bosch</h3>
              <p>Engenharia</p>
            </div>

            <div className={styles.empresaCard}>
              <img src={sephoraLogo} alt="GreenFlow" />
              <h3>Sephora</h3>
              <p>Cosméticos</p>
            </div>

            <div className={styles.empresaCard}>
              <img src={vansLogo} alt="HeavyRoute" />
              <h3>Vans</h3>
              <p>Moda e calçados</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.contact}>
            <h3>Fale Conosco</h3>
            <p>
              <span>⌕</span>
              +55 (11) 4002-8922
            </p>
            <p>
              <span>✉</span>
              contato@redbear.com.br
            </p>
          </div>

          <div className={styles.footerInfo}>
            <h3>Gestão de Suprimentos RedBear</h3>
            <p>© 2026 Todos os direitos reservados.</p>
            <p></p>
            <div className={styles.footerLinks}>
              <a href="/">Política de Privacidade</a>
              <a href="/">Termos de Uso</a>
              <a href="/">Configurações</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
