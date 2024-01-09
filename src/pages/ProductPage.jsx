import React from "react";
import ProductsList from "../components/product/ProductsList";
import SideBar from "../components/product/SideBar";

const ProductPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "300px", flex: "none" }}>
        <SideBar />
      </div>
      <ProductsList />
    </div>
  );
};

export default ProductPage;
