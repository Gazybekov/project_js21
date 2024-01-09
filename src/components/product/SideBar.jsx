import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContextProvider";

const SideBar = () => {
  const { categories, getCategories, fetchByParams } = useProducts();
  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  return (
    <Paper sx={{ p: 2 }} elevation={5}>
      <TextField variant="standard" label="search..." fullWidth />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          defaultValue="female"
          name="radio-buttons-group"
          aria-labelledby="demo-radio-buttons-group-label"
          onChange={(e) => fetchByParams("category", e.target.value)}
        >
          <FormControlLabel
            control={<Radio />}
            value={"all"}
            label={"ALL"}
          ></FormControlLabel>
          {categories.map((elem) => (
            <FormControlLabel
              label={elem.name}
              control={<Radio />}
              value={elem.name}
              key={elem.id}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default SideBar;
