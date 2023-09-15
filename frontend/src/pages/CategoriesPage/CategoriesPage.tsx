import React, { useCallback } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CategoryList from "../../components/CategoryList/CategoryList";
import { openAddCategoryDialog, openSearchCategoryDialog } from "../../stores/categories/categories";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const CategoriesPage = () => {
  const handleAddButtonClick = useCallback(() => {
    openAddCategoryDialog();
  }, []);

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography>Categories</Typography>
      <Stack direction={"row"}>
        <IconButton onClick={handleAddButtonClick}>
          <AddIcon />
        </IconButton>
      </Stack>
      <CategoryList />
    </Stack>
  )
}

export default React.memo(CategoriesPage);