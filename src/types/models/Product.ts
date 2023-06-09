import { ProductsSortKey, ProductsSortStatus } from '../types/Product';

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface ProductsSort {
  key: ProductsSortKey;
  status: ProductsSortStatus;
}

interface ProductPaginationMeta {
  limit: number;
  skip: number;
  total: number;
  q?: string;
}

interface ProductSearchMeta {
  limit: number;
  skip: number;
  q: string;
}

export type { Product, ProductsSort, ProductPaginationMeta, ProductSearchMeta };
