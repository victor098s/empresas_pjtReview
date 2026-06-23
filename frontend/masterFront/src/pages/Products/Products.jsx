import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import StatsCards from "../../components/StatsCards/StatsCards";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import ProductModal from "../../components/ProductModal/ProductModal";

import "./Products.css";

function Products() {

  const [openModal,setOpenModal] = useState(false);

  return (

    <>
      <Navbar/>

      <div className="products-page">

        <div className="title">

          <div>

            <h1>Gerenciamento de Produtos</h1>

            <p>
              Gerencie os produtos e seus fornecedores
            </p>

          </div>

          <button
          className="new-product"
          onClick={()=>setOpenModal(true)}
          >
            + Cadastrar Novo Produto
          </button>

        </div>

        <StatsCards/>

        <ProductsTable/>

      </div>

      {
        openModal &&
        <ProductModal
        setOpenModal={setOpenModal}
        />
      }

    </>
  );
}

export default Products;