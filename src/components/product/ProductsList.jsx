import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import PaginationControlled from "./Pagination";

const ProductsList = () => {
  const { getProducts, products } = useProducts();
  //! Search
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  useEffect(() => {
    getProducts();
  }, [searchParams]);
  //! PAGINATION
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const itemPerPage = 3;
  const count = Math.ceil(products.length / itemPerPage);
  console.log(count);
  function currentData() {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return products.slice(begin, end);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: "25px",
      }}
    >
      {currentData().map((elem) => (
        <ProductCard key={elem.id} elem={elem} />
      ))}
      <PaginationControlled
        handleChange={handleChange}
        page={page}
        count={count}
      />
    </Box>
  );
};

export default ProductsList;
