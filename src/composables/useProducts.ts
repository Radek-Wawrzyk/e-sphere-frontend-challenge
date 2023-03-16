import { productsService } from '@/api/services/products';
import { Product } from '@/types/models/Product';
import { computed, reactive } from 'vue';

const state = reactive({
  products: <Product[]>[],
  categories: <string[]>[],
  activeCategory: '',
});

const useProducts = () => {
  const fetchProductCategories = async (): Promise<string[]> => {
    try {
      const response = await productsService.getAllCategories();
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const { data } = await productsService.getAll({ limit: 20, skip: 0 });
      return data.products;
    } catch (err) {
      throw new Error('Error');
    }
  };

  const fetchInitialData = async () => {
    const [categories, products] = await Promise.all([fetchProductCategories(), fetchProducts()]);

    setCategories(categories);
    setProducts(products);
  };

  const setProducts = (products: Product[]) => {
    state.products = products;
  };
  const setCategories = (categories: string[]) => {
    state.categories = categories;
  };

  const getProducts = computed(() => state.products);
  const getCategories = computed(() => state.categories);

  return {
    fetchInitialData,
    getProducts,
    getCategories,
  };
};

export { useProducts };
