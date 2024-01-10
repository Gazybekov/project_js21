import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

export default function PaginationControlled(props) {
  const { page, count, handleChange } = props;
  return (
    <Stack spacing={2}>
      <Typography>Page:{page}</Typography>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
      ></Pagination>
    </Stack>
  );
}
