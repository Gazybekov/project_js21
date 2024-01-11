import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useProducts } from "../context/ProductContextProvider";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  boxShadow: 24,
  border: "2px solid black",
};
const AddCategoryModal = (props) => {
  const { createCategories } = useProducts();

  const [category, setCategory] = useState("");
  const { open, handleClose } = props;
  const handleAdd = () => {
    const newCategory = { name: category };
    createCategories(newCategory);
  };
  return (
    <Modal sx={style} open={open} onClose={handleClose}>
      <Box>
        <Typography component="h2" variant="h6">
          Add new category
        </Typography>
        <TextField
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button onClick={handleAdd}>Add</Button>
        <Button>Close</Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
