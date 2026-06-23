import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true" />
          <strong>RedBear Companies</strong>
        </div>
        <nav className={styles.menu} aria-label="Navegacao principal">
          <button className={`${styles.navItem} ${styles.active}`}>Empresas</button>
          <button className={styles.navItem}>Produtos</button>
        </nav>
      </div>
      <nav className={styles.actions} aria-label="Conta">
        <button className={styles.navAction}>Perfil</button>
        <button className={styles.navAction}>Sair</button>
      </nav>
    </header>
  )
}
