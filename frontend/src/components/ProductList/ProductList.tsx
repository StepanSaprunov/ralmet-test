import React, { useCallback, useEffect, useMemo } from "react";
import { $productsCount, $productsLimit, $productsPage, fetchProductsFX, setProductsLimit, setProductsPage } from "../../stores/products/products";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useStore } from "effector-react";
import ProductListHeader from "./ProductListHeader/ProductListHeader";
import ProductListBody from "./ProductListBody/ProductListBody";

const ProductList = () => {
  const page = useStore($productsPage);
  const limit = useStore($productsLimit);
  const count = useStore($productsCount);

  const maxPage = useMemo(() => {
    if (!limit) return 1;
    return Math.ceil(count / limit);
  }, [limit, count]);

  useEffect(() => {
    fetchProductsFX({
      page,
      limit: limit ? limit : undefined
    })
  }, [])

  const handlePaginationChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setProductsPage(value);
  }, []);

  const handleLimitSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as number;
    setProductsLimit(value ? value : null);
  };


  return (
    <>
      <ProductListHeader />
      <ProductListBody />
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

export default React.memo(ProductList);