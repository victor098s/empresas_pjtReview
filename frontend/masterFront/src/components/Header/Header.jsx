import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>RedBear Companies</h1>

        <nav className={styles.nav}>
          <a href="/empresas">Empresas</a>
          <a href="/produtos">Produtos</a>
          <button className={styles.btnSair}>Sair</button>
        </nav>
      </header>
    </>
  );
}
