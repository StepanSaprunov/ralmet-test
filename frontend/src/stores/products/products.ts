import { createEffect, createEvent, createStore, sample } from "effector";
import { IFetchProductsAttr, IFetchProductsResponse, IProduct } from "./types";
import { instanceAuth } from "../../utils/axios";

const $products = createStore<IProduct[] | null>(null);
const $productsCount = createStore<number>(0);

const $productsPage = createStore<number>(1);
const $productsLimit = createStore<number | null>(10);

const setProductsPage = createEvent<number>();
const setProductsLimit = createEvent<number | null>();

$productsPage.on(setProductsPage, (state, payload) => payload >= 1 ? payload : state);
$productsLimit.on(setProductsLimit, (state, payload) => {
  if (payload === null) {
    return null;
  }
  if (payload >= 1) {
    return payload;
  }
  return state;
});

const fetchProductsFX = createEffect(async (attr: IFetchProductsAttr): Promise<IFetchProductsResponse> => {
  const response = await instanceAuth.get("/products", {
    params: {
      ...attr
    }
  });
  return response.data;
});

sample({
  source: [$productsPage, $productsLimit, $productsCount],
  target: fetchProductsFX,
  fn: (src) => {
    const [page, limit] = src;
    const result: IFetchProductsAttr = {};
    if (page) {
      result.page = page;
    }
    if (limit) {
      result.limit = limit;
    }
    return result;
  }
});


$products.on(fetchProductsFX.doneData, (_, payload) => payload.rows);
$productsCount.on(fetchProductsFX.doneData, (_, payload) => payload.count);

export {
  $productsPage,
  $productsLimit,
  $productsCount,
  setProductsPage,
  setProductsLimit,
  fetchProductsFX,
  $products
}