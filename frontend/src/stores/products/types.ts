import { ICategory } from "../categories/types";

export interface IField {
  id: number;
  name: string;
  value: string;
}

export interface IFile {
  name: string;
  originalName: string;
}

export interface IProduct {
  id: number;
  name: string;
  categories: ICategory[],
  fields: IField[],
  files: IFile[]
}

export interface IFetchProductsAttr {
  page?: number;
  limit?: number;
}

export interface IFetchProductsResponse {
  rows: IProduct[];
  count: number;
}

export interface ICreateProduct {
  name: string;
  categories: number[];
  fields: { name: string, value: string }[];
  files: any[];
}

export interface IEditProductDialog {
  isOpen: boolean;
  product: IProduct | null;
}

export interface IEditProduct {
  id: number;
  name: string;
  categories: number[];
  fields: { name: string, value: string }[]
  files: Blob[];
  filesToRemove: IFile[];
}