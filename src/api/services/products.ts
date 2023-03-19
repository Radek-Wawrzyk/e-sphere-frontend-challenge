import { httpInstance } from '@/api';
import type { ApiProductsResponse, ApiProductsResponseMeta } from '@/types/models/Api';
import type { ProductSearchMeta } from '@/types/models/Product';

const productsService = {
  getAll: (meta: ApiProductsResponseMeta) => {
    return httpInstance.get<ApiProductsResponse>('/products', {
      params: {
        limit: meta.limit,
        skip: meta.skip,
      },
    });
  },
  getAllByCategory: (category: string) => {
    return httpInstance.get<ApiProductsResponse>(`/products/category/${category}`);
  },
  getAllCategories: () => {
    return httpInstance.get('/products/categories');
  },
  getAllBySearchQuery: (meta: ProductSearchMeta) => {
    return httpInstance.get<ApiProductsResponse>('/products/search', {
      params: {
        q: meta.q,
        limit: meta.limit,
        skip: meta.skip,
      },
    });
  },
};

export { productsService };
