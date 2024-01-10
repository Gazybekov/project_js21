import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProducts } from "../context/ProductContextProvider";
import { useEffect } from "react";

const CategorySelect = (props) => {
  const { handleInput } = props;
  const { categories, getCategories } = useProducts();
  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose category</InputLabel>
        <Select
          label="Category"
          defaultValue={""}
          name="category"
          id="demo-simple-select-label"
          labelId="demo-simple-select-label"
          onChange={handleInput}
        >
          {categories.map((elem) => (
            <MenuItem value={elem.name} key={elem.id}>
              {elem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;
