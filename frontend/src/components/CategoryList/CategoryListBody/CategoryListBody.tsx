import { useStore } from "effector-react";
import React from "react";
import { $categories } from "../../../stores/categories/categories";
import { Divider, Stack } from "@mui/material";
import CategoryListElement from "../CategoryListElement/CategoryListElement";

const CategoryListBody = () => {
  const categories = useStore($categories);

  return (
    <Stack width={"100%"} divider={<Divider orientation="horizontal" />}>
      {categories?.map(category => <CategoryListElement category={category} key={category.id} />)}
    </Stack>
  )
}

export default CategoryListBody;