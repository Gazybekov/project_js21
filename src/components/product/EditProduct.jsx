import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { editProduct, getOneProduct, oneProduct } = useProducts();
  console.log(oneProduct);
  const [product, setProduct] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (oneProduct) {
      setProduct(oneProduct);
    }
  }, [oneProduct]);

  const handleInput = (e) => {
    if (e.target.name === "price") {
      const obj = { ...product, [e.target.name]: Number(e.target.value) };
      setProduct(obj);
    } else {
      const obj = { ...product, [e.target.name]: e.target.value };
      setProduct(obj);
    }
  };
  useEffect(() => {
    getOneProduct(id);
  }, []);
  return (
    <Box
      sx={{
        width: "50vw",
        height: 500,
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" align="center">
        EDIT PRODUCT
      </Typography>
      <TextField
        onChange={handleInput}
        value={product.title}
        name="title"
        label="Title"
        variant="outlined"
      />
      <TextField
        onChange={handleInput}
        name="description"
        value={product.description}
        label="Description"
        variant="outlined"
      />
      <TextField
        onChange={handleInput}
        value={product.price}
        name="price"
        label="number"
        variant="outlined"
      />
      <TextField
        onChange={handleInput}
        value={product.image}
        name="image"
        label="Image URL"
        variant="outlined"
      />
      <Button
        onClick={() => {
          editProduct(id, product);
        }}
        fullWidth
        variant="outlined"
      >
        EDIT PRODUCT
      </Button>
    </Box>
  );
};

export default EditProduct;
