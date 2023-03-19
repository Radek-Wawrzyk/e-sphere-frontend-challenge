import { ProductsSortKey, ProductsSortStatus } from "../types/Product";

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

export type { Product, ProductsSort };
