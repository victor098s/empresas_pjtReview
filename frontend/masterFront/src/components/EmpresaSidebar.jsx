import { useEffect, useState } from 'react'
import styles from './EmpresaSidebar.module.css'

const initialErrors = {
  razaoSocial: '',
  cnpj: '',
  telefone: ''
}

const validateCNPJ = (value) => {
  const numeric = value.replace(/\D/g, '')
  return /^\d{14}$/.test(numeric)
}

export default function EmpresaSidebar({ isOpen, setIsOpen, empresa, onSave, onCancel }) {
  const [form, setForm] = useState(empresa)
  const [errors, setErrors] = useState(initialErrors)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(empresa)
    setErrors(initialErrors)
  }, [empresa])

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const validate = () => {
    const nextErrors = { ...initialErrors }
    if (!form.razaoSocial.trim()) nextErrors.razaoSocial = 'Razao Social e obrigatoria.'
    if (!form.cnpj.trim()) nextErrors.cnpj = 'CNPJ e obrigatorio.'
    if (form.cnpj && !validateCNPJ(form.cnpj)) nextErrors.cnpj = 'Formato de CNPJ invalido.'
    if (!form.telefone.trim()) nextErrors.telefone = 'Telefone e obrigatorio.'
    setErrors(nextErrors)
    return Object.values(nextErrors).every((value) => !value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await onSave(form)
      setIsOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Registrar Empresa</h2>
          <p>Formulario de entrada</p>
        </div>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Fechar painel">
          x
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formBody}>
          <label className={styles.formGroup}>
            Razao Social
            <input
              type="text"
              value={form.razaoSocial}
              onChange={(event) => handleChange('razaoSocial', event.target.value)}
              className={errors.razaoSocial ? styles.invalid : ''}
              placeholder="ex: Acme Corp Industrias"
            />
            {errors.razaoSocial && <span className={styles.errorText}>{errors.razaoSocial}</span>}
          </label>

          <label className={styles.formGroup}>
            CNPJ / Numero de Identificacao Fiscal
            <input
              type="text"
              value={form.cnpj}
              onChange={(event) => handleChange('cnpj', event.target.value)}
              className={errors.cnpj ? styles.invalid : ''}
              placeholder="00.000.000/0000-00"
            />
            {errors.cnpj && <span className={styles.errorText}>{errors.cnpj}</span>}
          </label>

          <label className={styles.formGroup}>
            Telefone de Contato Principal
            <input
              type="text"
              value={form.telefone}
              onChange={(event) => handleChange('telefone', event.target.value)}
              className={errors.telefone ? styles.invalid : ''}
              placeholder="+55 (00) 00000-0000"
            />
            {errors.telefone && <span className={styles.errorText}>{errors.telefone}</span>}
          </label>

          <div className={styles.validationCard}>
            <h3>Requisitos de Validacao</h3>
            <ul>
              <li>Licenca de operacao valida deve ser anexada apos o registro.</li>
              <li>Verificacao automatica de conformidade sera iniciada no envio.</li>
              <li>Pessoa de contato deve ser verificada via autenticacao de dois canais.</li>
            </ul>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={`${styles.footerBtn} ${styles.cancelBtn}`} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={`${styles.footerBtn} ${styles.saveBtn}`} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>
      </form>
    </aside>
  )
}
