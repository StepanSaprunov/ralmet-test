import { createEffect, createEvent, createStore, sample } from "effector";
import { ICreateProduct, IFetchProductsAttr, IFetchProductsResponse, IProduct } from "./types";
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

const $addProductDialogIsOpened = createStore<boolean>(false);

const openAddProductDialog = createEvent();
const closeAddProductDialog = createEvent();

$addProductDialogIsOpened.on(openAddProductDialog, () => true);
$addProductDialogIsOpened.on(closeAddProductDialog, () => false);

const createProductFX = createEffect(async (attr: ICreateProduct): Promise<IProduct> => {
  function buildFormData(formData: any, data: any, parentKey?: any) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
      if (!(Array.isArray(data))) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      }
      else {
        data.forEach((el, index) => buildFormData(formData, el, parentKey === 'files' ? parentKey : `${parentKey}[${index}]`));
      }
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data: any) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
  }
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
  deleteProductFX
}