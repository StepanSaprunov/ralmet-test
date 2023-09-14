import { useStore } from "effector-react";
import React from "react";
import { $categories } from "../../../stores/categories/categories";
import { Stack } from "@mui/material";
import CategoryListElement from "../CategoryListElement/CategoryListElement";

const CategoryListBody = () => {
  const categories = useStore($categories);

  return (
    <Stack width={"100%"} spacing={2}>
      {categories?.map(category => <CategoryListElement category={category} key={category.id} />)}
    </Stack>
  )
}

export default CategoryListBody;