import styles from './EmpresaTable.module.css'

const EmpresaTable = ({ empresas, isLoading, onEdit, onDelete }) => {
  const displayRows = empresas
  const firstRow = displayRows.length > 0 ? 1 : 0
  const lastRow = Math.min(displayRows.length, 4)

  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableHeader}>
        <div className={styles.headingGroup}>
          <h2 className={styles.title}>Empresas Registradas</h2>
          <span className={styles.badge}>Dados em tempo real</span>
        </div>
        <div className={styles.tableActions}>
          <button className={styles.toolButton} aria-label="Filtrar empresas">
            <span className={styles.filterIcon} aria-hidden="true" />
          </button>
          <button className={styles.toolButton} aria-label="Baixar dados">
            <span className={styles.downloadIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.wrapper}>
        <table>
          <thead>
            <tr>
              <th>Nome da empresa</th>
              <th>CNPJ / ID Fiscal</th>
              <th>Telefone</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  Carregando empresas...
                </td>
              </tr>
            ) : displayRows.length === 0 ? (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  Nenhuma empresa cadastrada.
                </td>
              </tr>
            ) : (
              displayRows.map((empresa) => {
                const initials = empresa.razao_social
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()

                return (
                  <tr key={empresa.id}>
                    <td>
                      <div className={styles.companyCell}>
                        <div className={styles.avatar}>{initials}</div>
                        <div className={styles.companyInfo}>
                          <strong>{empresa.razao_social}</strong>
                        </div>
                      </div>
                    </td>
                    <td className={styles.mono}>{empresa.cnpj}</td>
                    <td className={styles.mono}>{empresa.telefone}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={styles.actionButton} onClick={() => onEdit(empresa)} aria-label="Editar empresa">
                          <span className={styles.editIcon} aria-hidden="true" />
                        </button>
                        <button className={styles.actionButton} onClick={() => onDelete(empresa.id)} aria-label="Excluir empresa">
                          <span className={styles.trashIcon} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span className={styles.resultText}>Exibindo {firstRow} a {lastRow} de {displayRows.length} entradas</span>
        <div className={styles.pageGroup}>
          <button className={styles.pageBtn}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span className={styles.ellipsis}>...</span>
          <button className={styles.pageBtn}>321</button>
          <button className={styles.pageBtn}>&gt;</button>
        </div>
      </div>
    </div>
  )
}

export default EmpresaTable
