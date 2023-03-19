import { ProductsSortKey } from "../types/Product";

const PRODUCTS_PER_PAGE = ['10', '25', '50', '100'];
const DEFAULT_PRODUCTS_PER_PAGE = 10;
const PRODUCTS_SORTING_KEYS: ProductsSortKey[] = ['price', 'stock', 'rating'];

export { PRODUCTS_PER_PAGE, DEFAULT_PRODUCTS_PER_PAGE, PRODUCTS_SORTING_KEYS };
