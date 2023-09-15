import { createEffect, createEvent, createStore, sample } from "effector";
import { ICreateProduct, IEditProduct, IEditProductDialog, IFetchProductsAttr, IFetchProductsResponse, IProduct } from "./types";
import { instanceAuth } from "../../utils/axios";
import { jsonToFormData } from "../../utils/json-to-form-data";

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

const $addProductDialogIsOpened = createStore<boolean>(false);

const openAddProductDialog = createEvent();
const closeAddProductDialog = createEvent();

$addProductDialogIsOpened.on(openAddProductDialog, () => true);
$addProductDialogIsOpened.on(closeAddProductDialog, () => false);

const createProductFX = createEffect(async (attr: ICreateProduct): Promise<IProduct> => {
  const response = await instanceAuth.post("/products", jsonToFormData(attr), {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
});

$addProductDialogIsOpened.on(createProductFX.doneData, () => false);

sample({
  clock: createProductFX.done,
  source: [$productsPage, $productsLimit],
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

const deleteProductFX = createEffect(async (id: number) => {
  await instanceAuth.delete(`/products/${id}`);
});

sample({
  clock: deleteProductFX.done,
  source: [$productsPage, $productsLimit],
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

const $editProductDialog = createStore<IEditProductDialog>({
  product: null,
  isOpen: false,
});

const openEditProductDialog = createEvent<IProduct>();
const closeEditProductDialog = createEvent();

$editProductDialog.on(openEditProductDialog, (_, payload) => {
  return {
    isOpen: true,
    product: payload
  }
});
$editProductDialog.on(closeEditProductDialog, () => {
  return {
    isOpen: false,
    product: null
  }
});

const editProductFX = createEffect(async (attr: IEditProduct): Promise<IProduct> => {
  const response = await instanceAuth.patch(`/products/${attr.id}`, jsonToFormData(attr), {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
});

$editProductDialog.on(editProductFX.done, () => {
  return {
    product: null,
    isOpen: false
  }
});

sample({
  clock: editProductFX.done,
  source: [$productsPage, $productsLimit],
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

export {
  $productsPage,
  $productsLimit,
  $productsCount,
  setProductsPage,
  setProductsLimit,
  fetchProductsFX,
  $products,
  $addProductDialogIsOpened,
  openAddProductDialog,
  closeAddProductDialog,
  createProductFX,
  deleteProductFX,
  $editProductDialog,
  openEditProductDialog,
  closeEditProductDialog,
  editProductFX
}