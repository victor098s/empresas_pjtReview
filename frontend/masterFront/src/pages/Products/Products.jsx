import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import StatsCards from "../../components/StatsCards/StatsCards";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import ProductModal from "../../components/ProductModal/ProductModal";
import { productService } from "../../services/productService";

import styles from "./Products.module.css";

function Products() {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");
      const productsData = await productService.getProducts();
      setProducts(productsData);
    } catch (err) {
      console.log(err);
      setError(err.message || "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className={styles["products-page"]}>
        <div className={styles.title}>
          <div>
            <h1>Gerenciamento de Produtos</h1>

            <p>Gerencie os produtos e seus fornecedores</p>
          </div>

          <button
            className={styles["new-product"]}
            onClick={() => setOpenModal(true)}
          >
            + Cadastrar Novo Produto
          </button>
        </div>

        <StatsCards products={products} />

        <ProductsTable
          products={products}
          setProducts={setProducts}
          loading={loading}
          error={error}
        />
      </div>

      {openModal && (
        <ProductModal
          setOpenModal={setOpenModal}
          onProductCreated={loadProducts}
        />
      )}
    </>
  );
}

export default Products;
