import React, { useCallback } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CategoryList from "../../components/CategoryList/CategoryList";
import { $categoriesCount, $categoriesLimit, $categoriesPage, openAddCategoryDialog } from "../../stores/categories/categories";
import { useStore } from "effector-react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const CategoriesPage = () => {
  const page = useStore($categoriesPage);
  const limit = useStore($categoriesLimit);
  const count = useStore($categoriesCount);

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
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Stack>
      <CategoryList
        page={page}
        limit={limit}
        count={count}
      />
    </Stack>
  )
}

export default React.memo(CategoriesPage);