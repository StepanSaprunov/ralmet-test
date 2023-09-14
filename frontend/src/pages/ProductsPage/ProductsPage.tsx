import React, { useCallback } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ProductList from "../../components/ProductList/ProductList";
import { openAddProductDialog } from "../../stores/products/products";

const ProductsPage = () => {
  const handleAddButtonClick = useCallback(() => {
    openAddProductDialog();
  }, []);

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography>Products</Typography>
      <Stack direction={"row"}>
        <IconButton onClick={handleAddButtonClick}>
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