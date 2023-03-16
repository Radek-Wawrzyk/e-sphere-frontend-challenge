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

export type { ApiResponseMeta, ApiProductsResponse };
