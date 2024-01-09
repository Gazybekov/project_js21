import { Button } from "@mui/base";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { useProducts } from "../context/ProductContextProvider";
import { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  boxShadow: 24,
  border: "2px solid black",
};
const AddCategoryModal = () => {
  const { createCategories } = useProducts();

  const [category, setCategory] = useState("");
  const handleAdd = () => {
    const newCategory = { name: category };
    createCategories(newCategory);
  };
  return (
    <Modal
      sx={style}
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography variant="h6">Add new category</Typography>
        <TextField
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
          required
        />
        <Button onClick={handleAdd}>Add</Button>
        <Button>Close</Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
