import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { useSearchParams } from "react-router-dom";

const SideBar = () => {
  const { categories, getCategories, fetchByParams } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);
  return (
    <Paper sx={{ p: 2 }} elevation={5}>
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        variant="standard"
        label="search..."
        fullWidth
        value={search}
      />
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
