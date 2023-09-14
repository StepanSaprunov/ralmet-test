import { useStore } from "effector-react";
import { Divider, Stack } from "@mui/material";
import { $products } from "../../../stores/products/products";
import ProductListElement from "../ProductListElement/ProductListElement";

const ProductListBody = () => {
  const products = useStore($products);

  return (
    <Stack width={"100%"} divider={<Divider orientation="horizontal" />}>
      {products?.map(product => <ProductListElement product={product} key={product.id} />)}
    </Stack>
  )
}

export default ProductListBody;