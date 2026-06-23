import styles from './MetricsCards.module.css'

export default function MetricsCards({ metrics }) {
  const items = [
    {
      label: 'Total de entidades',
      value: metrics.total,
      note: '+4%',
      tone: 'danger'
    },
    {
      label: 'Fornecedores ativos',
      value: metrics.ativos,
      note: 'Estavel',
      tone: 'neutral'
    },
    {
      label: 'Verificacao pendente',
      value: metrics.pendentes,
      note: 'Atencao',
      tone: 'danger'
    },
    {
      label: 'Taxa de conformidade',
      value: `${metrics.taxa}%`,
      note: '',
      tone: 'bar'
    }
  ]

  return (
    <div className={styles.metricsGrid}>
      {items.map((item) => (
        <article className={styles.card} key={item.label}>
          <p className={styles.label}>{item.label}</p>
          <div className={styles.valueRow}>
            <h2 className={styles.value}>{item.value}</h2>
            {item.note && (
              <span className={`${styles.note} ${styles[item.tone]}`}>
                {item.note}
              </span>
            )}
          </div>
          {item.tone === 'bar' && <span className={styles.progressBar} />}
        </article>
      ))}
    </div>
  )
}
