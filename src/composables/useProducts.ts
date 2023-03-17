import { productsService } from '@/api/services/products';
import { Product } from '@/types/models/Product';
import { computed, reactive } from 'vue';

const state = reactive({
  products: <Product[]>[],
  categories: <string[]>[],
  activeCategory: '',
  meta: {
    limit: 10,
    skip: 0,
    total: 0,
  },
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

  const fetchProductsByCategory = async () => {
    try {
      const { data } = await productsService.getAllByCategory(state.activeCategory);
      setProducts(data.products);
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

  const selectCategory = (category: string) => {
    state.activeCategory = category;

    if (category) fetchProductsByCategory();
    else fetchProducts();
  };

  const searchByQuery = async (query: string) => {
    try {
      const { data } = await productsService.getAllBySearchQuery(query);
      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    } 
  };

  const getProducts = computed(() => state.products);
  const getCategories = computed(() => state.categories);
  const getActiveCategory = computed(() => state.activeCategory);
  const hasProducts = computed(() => !!state.products.length);

  return {
    fetchInitialData,
    getProducts,
    selectCategory,
    getCategories,
    getActiveCategory,
    searchByQuery,
    hasProducts,
  };
};

export { useProducts };
