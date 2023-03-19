import { httpInstance } from '@/api';
import type { ApiProductsResponse, ApiProductsResponseMeta } from '@/types/models/Api';

const productsService = {
  getAll: (meta: ApiProductsResponseMeta) => {
    return httpInstance.get<ApiProductsResponse>('/products', {
      params: {
        limit: meta.limit,
        skip: meta.skip,
      }
    });
  },
  getAllByCategory: (category: string) => {
    return httpInstance.get<ApiProductsResponse>(`/products/category/${category}`)
  },
  getAllCategories: () => {
    return httpInstance.get('/products/categories/');
  },
  getAllBySearchQuery: (searchQuery: string) => {
    return httpInstance.get<ApiProductsResponse>('/products/search', {
      params: {
        q: searchQuery,
      },
    });
  },
}; 

export { productsService };
