import { httpInstance } from '@/api';
import type { ApiProductsResponse } from '@/types/models/Api';

const productsService = {
  getAll: (payload: any) => {
    return httpInstance.get<ApiProductsResponse>('/products', {
      params: {
        limit: payload.limit,
        skip: payload.skip,
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
