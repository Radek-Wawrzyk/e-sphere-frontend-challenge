import { ProductsSortKey } from '../types/Product';
import { ProductsSort, ProductPaginationMeta } from '../models/Product';

const PRODUCTS_PER_PAGE = ['10', '25', '50', '100'];
const DEFAULT_PRODUCTS_PER_PAGE = 10;
const PRODUCTS_SORTING_KEYS: ProductsSortKey[] = ['price', 'stock', 'rating'];

const PRODUCTS_DEFAULT_PAGINATION_META: ProductPaginationMeta = {
  limit: DEFAULT_PRODUCTS_PER_PAGE,
  skip: 0,
  total: 0,
};

const PRODUCTS_DEFAULT_SORT_META: ProductsSort = {
  key: 'price',
  status: 'inactive',
};

export {
  PRODUCTS_PER_PAGE,
  PRODUCTS_DEFAULT_PAGINATION_META,
  PRODUCTS_DEFAULT_SORT_META,
  DEFAULT_PRODUCTS_PER_PAGE,
  PRODUCTS_SORTING_KEYS,
};
