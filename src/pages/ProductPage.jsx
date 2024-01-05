import React from "react";
import ProductsList from "../components/product/ProductsList";

const ProductPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "300px", flex: "none" }}>
        {/* <CategoryFilter /> */}
      </div>
      <ProductsList />
    </div>
  );
};

export default ProductPage;
