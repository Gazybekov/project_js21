import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContextProvider";
import { AddShoppingCart } from "@mui/icons-material";
import Detail from "./Detail";

const ProductCard = ({ elem }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const { addProductToCart } = useCart();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card
      sx={{
        width: { md: "30vw", lg: "19vw" },
        height: 450,
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        margin: "2%",
      }}
    >
      <CardActionArea onClick={handleOpen}>
        <CardMedia sx={{ height: 240, borderRadius: 4 }} image={elem.image} />
      </CardActionArea>

      <CardContent sx={{ padding: "20px 5px 0px 5px" }}>
        <Typography fontSize="20" fontWeight={700} variant="h5" component="div">
          {elem.title}
        </Typography>
        <Stack spacing={1} margin="8px 0">
          <Rating name="haf-rating" defaultValue={0} precision={1} />
        </Stack>
        <Typography color="black" fontSize="24px" fontWeight={700}>
          {elem.price}
        </Typography>
        <Typography color="black" fontSize="24px" fontWeight={700}>
          {elem.description}
        </Typography>
        <Button
          onClick={() => deleteProduct(elem.id)}
          size="medium"
          variant="outlined"
          color="secondary"
        >
          Delete
        </Button>
        <Button
          onClick={() => navigate(`/edit/${elem.id}`)}
          size="medium"
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
        <IconButton onClick={() => addProductToCart(elem)}>
          <AddShoppingCart />
        </IconButton>
      </CardContent>
      <Detail open={open} handleClose={handleClose} elem={elem} />
    </Card>
  );
};

export default ProductCard;
