import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCart } from "../context/CartContextProvider";
import React, { useEffect } from "react";

const Cart = () => {
  const { cart, getCart, changeProductCount, deleteProductFromCart } =
    useCart();
  console.log(cart);
  useEffect(() => {
    getCart();
  }, []);
  const cartCleaner = () => {
    localStorage.removeItem("cart");
    getCart();
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Picture</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>SubPrice</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((elem) => (
            <TableRow key={elem.item.id}>
              <TableCell component="th" scope="row">
                <img width={"70"} src={elem.item.image} alt="" />
              </TableCell>
              <TableCell align="right">{elem.item.title}</TableCell>
              <TableCell align="right">{elem.item.category}</TableCell>
              <TableCell align="right">{elem.item.price}</TableCell>

              <TableCell align="right">
                <input
                  onChange={(e) => {
                    changeProductCount(elem.item.id, e.target.value);
                  }}
                  type="number"
                  min={1}
                  max={20}
                  value={elem.count}
                />
              </TableCell>
              <TableCell align="right">{elem.subPrice}</TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteProductFromCart(elem.item.id)}>
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={cartCleaner}>BYE NOW FOR {cart.totalPrice} </Button>
    </TableContainer>
  );
};

export default Cart;
