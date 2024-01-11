import React, { useState } from "react";
import AddProduct from "../components/product/AddProduct";
import AddCategoryModal from "../components/product/AddCategoryModal";
import { Button } from "@mui/material";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add category
      </Button>
      <AddProduct />
      <AddCategoryModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default AdminPage;
