import React, { useCallback, useEffect, useMemo } from "react";
import CategoryListHeader from "./CategoryListHeader/CategoryListHeader";
import CategoryListBody from "./CategoryListBody/CategoryListBody";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { $categoriesCount, $categoriesLimit, $categoriesPage, fetchCategoriesFX, setCategoriesLimit, setCategoriesPage } from "../../stores/categories/categories";
import { useStore } from "effector-react";

const CategoryList = () => {
  const page = useStore($categoriesPage);
  const limit = useStore($categoriesLimit);
  const count = useStore($categoriesCount);

  const maxPage = useMemo(() => {
    if (!limit) return 1;
    return Math.ceil(count / limit);
  }, [limit, count]);

  useEffect(() => {
    fetchCategoriesFX({
      page,
      limit: limit ? limit : undefined
    })
  }, [])

  const handlePaginationChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setCategoriesPage(value);
  }, []);

  const handleLimitSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as number;
    setCategoriesLimit(value ? value : null);
  };


  return (
    <>
      <CategoryListHeader />
      <CategoryListBody />
      <Stack direction={"row"} alignItems={"center"}>
        <Pagination count={maxPage} page={page} onChange={handlePaginationChange} />
        <Select
          labelId="limit-label"
          id="limitSelect"
          value={(limit ? limit : 0) as unknown as string}
          onChange={handleLimitSelectChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={0}>All</MenuItem>
        </Select>
      </Stack>
    </>
  );
}

export default React.memo(CategoryList);