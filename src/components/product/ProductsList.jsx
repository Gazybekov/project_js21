import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: "25px",
      }}
    >
      {products.map((elem) => (
        <ProductCard key={elem.id} elem={elem} />
      ))}
    </Box>
  );
};

export default ProductsList;
