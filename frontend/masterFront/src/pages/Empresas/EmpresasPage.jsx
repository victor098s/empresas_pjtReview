import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EmpresaSidebar from "../../components/EmpresaSidebar";
import EmpresaTable from "../../components/EmpresaTable";
import MetricsCards from "../../components/MetricsCards";
import Notification from "../../components/Notification";
import styles from "./EmpresasPage.module.css";
import Header from "../../components/Header/Header";

const API_BASE_URL = "http://localhost:3000";

const handleResponse = async (response) => {
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Erro ao conectar com o servidor.");
  }

  return body;
};

const normalizeEmpresa = (empresa) => ({
  ...empresa,
  id: empresa.id ?? empresa.id_emp,
  razao_social: empresa.razao_social ?? empresa.nome,
  cnpj: empresa.cnpj ?? "",
  telefone: empresa.telefone ?? "",
});

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentEmpresa, setCurrentEmpresa] = useState({
    razaoSocial: "",
    cnpj: "",
    telefone: "",
  });

  useEffect(() => {
    loadEmpresas();
  }, []);

  const loadEmpresas = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/empresas`);
      const data = await handleResponse(res);
      setEmpresas(data.map(normalizeEmpresa));
    } catch (error) {
      showNotification("error", error.message || "Erro ao carregar empresas");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddEmpresa = () => {
    setCurrentEmpresa({
      razaoSocial: "",
      cnpj: "",
      telefone: "",
    });
    setSidebarOpen(true);
  };

  const handleEditEmpresa = (empresa) => {
    setCurrentEmpresa({
      razaoSocial: empresa.razao_social,
      cnpj: empresa.cnpj,
      telefone: empresa.telefone,
      id: empresa.id,
    });
    setSidebarOpen(true);
  };

  const handleDeleteEmpresa = async (id) => {
    if (confirm("Tem certeza que deseja deletar esta empresa?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/empresas/${id}`, {
          method: "DELETE",
        });
        await handleResponse(res);
        showNotification("success", "Empresa deletada com sucesso");
        loadEmpresas();
      } catch (error) {
        showNotification("error", error.message || "Erro ao deletar empresa");
        console.error(error);
      }
    }
  };

  const handleSaveEmpresa = async (formData) => {
    try {
      const payload = {
        nome: formData.razaoSocial,
        cnpj: formData.cnpj,
        telefone: formData.telefone,
      };

      if (formData.id) {
        const res = await fetch(`${API_BASE_URL}/empresas/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        await handleResponse(res);
        showNotification("success", "Empresa atualizada com sucesso");
      } else {
        const res = await fetch(`${API_BASE_URL}/empresas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        await handleResponse(res);
        showNotification("success", "Empresa criada com sucesso");
      }

      setSidebarOpen(false);
      loadEmpresas();
    } catch (error) {
      showNotification("error", error.message || "Erro ao salvar empresa");
      console.error(error);
    }
  };

  const calculateMetrics = () => ({
    total: empresas.length,
    ativos: empresas.length,
    pendentes: 0,
    taxa: empresas.length > 0 ? 98.2 : 0,
  });

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.pageMain}>
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>Empresas</h1>
            <p className={styles.headerSubtitle}>
              Gerencie entidades fornecedoras e parceiros corporativos
              registrados.
            </p>
          </div>
          <button
            className={`${styles.btnPrimary} ${styles.btnLg}`}
            onClick={handleAddEmpresa}
          >
            <span aria-hidden="true">+</span>
            Registrar Nova Empresa
          </button>
        </div>

        <section className={styles.metricsSection}>
          <MetricsCards metrics={calculateMetrics()} />
        </section>

        <section className={styles.tableSection}>
          <EmpresaTable
            empresas={empresas}
            isLoading={isLoading}
            onEdit={handleEditEmpresa}
            onDelete={handleDeleteEmpresa}
          />
        </section>
      </main>

      <EmpresaSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        empresa={currentEmpresa}
        onSave={handleSaveEmpresa}
        onCancel={() => setSidebarOpen(false)}
      />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <footer className={styles.footer}>
        <span>
          © 2024 RedBear Companies Gestao de Suprimentos. Todos os direitos
          reservados.
        </span>
        <nav className={styles.footerLinks} aria-label="Links legais">
          <a href="#">Suporte</a>
          <a href="#">Politica de Privacidade</a>
          <a href="#">Termos de Servico</a>
        </nav>
      </footer>
    </div>
  );
}
