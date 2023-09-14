import { ICategory } from "../categories/types";

export interface IField {
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