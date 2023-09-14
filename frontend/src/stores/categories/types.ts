export interface ICategory {
  id: number;
  name: string;
  products: string[];
  subcategories?: ICategory[]
}

export interface IEditCategoryDialog {
  category: ICategory | null;
  isOpen: boolean;
}

export interface IFetchCategoriesAttr {
  page?: number;
  limit?: number;
}

export interface IFetchCategoriesResponse {
  rows: ICategory[];
  count: number;
}