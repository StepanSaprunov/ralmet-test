import { createEffect, createEvent, createStore, sample } from "effector";
import { ICategory, ICreateCategory, IEditCategory, IEditCategoryDialog, IFetchCategoriesAttr, IFetchCategoriesResponse } from "./types";
import { instanceAuth } from "../../utils/axios";

const $categories = createStore<ICategory[] | null>(null);
const $categoriesCount = createStore<number>(0);

const $editCategoryDialog = createStore<IEditCategoryDialog>({
  category: null,
  isOpen: false,
});

const openEditCategoryDialog = createEvent<ICategory>();
const closeEditCategoryDialog = createEvent();

$editCategoryDialog.on(openEditCategoryDialog, (_, payload) => {
  return {
    isOpen: true,
    category: payload
  }
});
$editCategoryDialog.on(closeEditCategoryDialog, () => {
  return {
    isOpen: false,
    category: null
  }
});

const $addCategoryDialogIsOpened = createStore<boolean>(false);

const openAddCategoryDialog = createEvent();
const closeAddCategoryDialog = createEvent();

$addCategoryDialogIsOpened.on(openAddCategoryDialog, () => true);
$addCategoryDialogIsOpened.on(closeAddCategoryDialog, () => false);

const $categoriesPage = createStore<number>(1);
const $categoriesLimit = createStore<number | null>(10);

const setCategoriesPage = createEvent<number>();
const setCategoriesLimit = createEvent<number | null>();

$categoriesPage.on(setCategoriesPage, (state, payload) => payload >= 1 ? payload : state);
$categoriesLimit.on(setCategoriesLimit, (state, payload) => {
  if (payload === null) {
    return null;
  }
  if (payload >= 1) {
    return payload;
  }
  return state;
});

const fetchCategoriesFX = createEffect(async (attr: IFetchCategoriesAttr): Promise<IFetchCategoriesResponse> => {
  const response = await instanceAuth.get("/categories", {
    params: {
      ...attr
    }
  });
  return response.data;
});

const deleteCategoryFX = createEffect(async (id: number) => {
  await instanceAuth.delete(`/categories/${id}`);
})

const createCategoryFX = createEffect(async (attr: ICreateCategory): Promise<ICategory> => {
  const response = await instanceAuth.post("/categories", attr);
  return response.data;
});

const editCategoryFX = createEffect(async (attr: IEditCategory): Promise<ICategory> => {
  const response = await instanceAuth.patch(`/categories/${attr.id}`, attr);
  return response.data;
});

$editCategoryDialog.on(editCategoryFX.done, () => {
  return {
    category: null,
    isOpen: false
  }
});

$addCategoryDialogIsOpened.on(createCategoryFX.doneData, () => false);

const fetchAllCategoriesFX = createEffect(async (): Promise<IFetchCategoriesResponse> => {
  const response = await instanceAuth.get("/categories");
  return response.data;
});

const $allCategories = createStore<ICategory[]>([]);

$allCategories.on(fetchAllCategoriesFX.doneData, (_, payload) => payload.rows);

sample({
  source: [$categoriesPage, $categoriesLimit, $categoriesCount],
  target: fetchCategoriesFX,
  fn: (src) => {
    const [page, limit] = src;
    const result: IFetchCategoriesAttr = {};
    if (page) {
      result.page = page;
    }
    if (limit) {
      result.limit = limit;
    }
    return result;
  }
});

sample({
  clock: createCategoryFX.done,
  source: [$categoriesPage, $categoriesLimit],
  target: fetchCategoriesFX,
  fn: (src) => {
    const [page, limit] = src;
    const result: IFetchCategoriesAttr = {};
    if (page) {
      result.page = page;
    }
    if (limit) {
      result.limit = limit;
    }
    return result;
  }
});

sample({
  clock: deleteCategoryFX.done,
  source: [$categoriesPage, $categoriesLimit],
  target: fetchCategoriesFX,
  fn: (src) => {
    const [page, limit] = src;
    const result: IFetchCategoriesAttr = {};
    if (page) {
      result.page = page;
    }
    if (limit) {
      result.limit = limit;
    }
    return result;
  }
});

sample({
  clock: editCategoryFX.done,
  source: [$categoriesPage, $categoriesLimit],
  target: fetchCategoriesFX,
  fn: (src) => {
    const [page, limit] = src;
    const result: IFetchCategoriesAttr = {};
    if (page) {
      result.page = page;
    }
    if (limit) {
      result.limit = limit;
    }
    return result;
  }
});

sample({
  clock: deleteCategoryFX.done,
  target: fetchAllCategoriesFX
});

sample({
  clock: createCategoryFX.done,
  target: fetchAllCategoriesFX
});

sample({
  clock: editCategoryFX.done,
  target: fetchAllCategoriesFX
});

$categories.on(fetchCategoriesFX.doneData, (_, payload) => payload.rows);
$categoriesCount.on(fetchCategoriesFX.doneData, (_, payload) => payload.count);

export {
  $categories,
  $categoriesCount,
  $editCategoryDialog,
  openEditCategoryDialog,
  closeEditCategoryDialog,
  $categoriesPage,
  $categoriesLimit,
  setCategoriesPage,
  setCategoriesLimit,
  fetchCategoriesFX,
  openAddCategoryDialog,
  closeAddCategoryDialog,
  $addCategoryDialogIsOpened,
  fetchAllCategoriesFX,
  $allCategories,
  createCategoryFX,
  deleteCategoryFX,
  editCategoryFX,
}