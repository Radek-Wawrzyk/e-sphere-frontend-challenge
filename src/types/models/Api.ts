import { Product } from "./Product";

interface ApiResponseMeta {
  limit: number;
  skip: number;
  total: number;
}

interface ApiProductsResponse extends ApiResponseMeta {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
}

interface ApiProductsResponseMeta {
  limit: number;
  skip: number;
}

export type { ApiResponseMeta, ApiProductsResponse, ApiProductsResponseMeta };
