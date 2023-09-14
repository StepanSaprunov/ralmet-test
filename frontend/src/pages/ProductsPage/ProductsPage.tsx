import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ProductList from "../../components/ProductList/ProductList";

const ProductsPage = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography>Products</Typography>
      <Stack direction={"row"}>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Stack>
      <ProductList />
    </Stack>
  )
}

export default React.memo(ProductsPage);