import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCart } from "../context/CartContextProvider";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);
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
              <TableCell>{elem.item.title}</TableCell>
              <TableCell>{elem.item.category}</TableCell>
              <TableCell>{elem.item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
