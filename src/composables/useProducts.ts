import { productsService } from '@/api/services/products';
import { DEFAULT_PRODUCTS_PER_PAGE } from '@/types/constants/Product';
import { Product } from '@/types/models/Product';
import { computed, reactive, watch } from 'vue';

const state = reactive({
  products: <Product[]>[],
  categories: <string[]>[],
  isLoading: false,
  activeCategory: '',
  paginationMeta: {
    limit: DEFAULT_PRODUCTS_PER_PAGE,
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
      const { data } = await productsService.getAll({ 
        limit: getPaginationMeta.value.limit, 
        skip: getPaginationMeta.value.skip,
      });

      setPaginationMeta({ limit: data.limit, total: data.total, skip: data.skip });

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
  const setPaginationMeta = (meta: any) => {
    state.paginationMeta = meta;

    console.log()
  };

  const selectCategory = (category: string) => {
    state.activeCategory = category;

    if (category) fetchProductsByCategory();
    else fetchProducts();
  };

  const changePage = async (skip: number) => {
    setPaginationMeta({ ...getPaginationMeta.value, skip });
    setProducts(await fetchProducts());
  };

  const searchByQuery = async (query: string) => {
    try {
      const { data } = await productsService.getAllBySearchQuery(query);
      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    } 
  };

  const hasProducts = computed(() => !!state.products.length);
  const isLoading = computed(() => state.isLoading);

  const getProducts = computed(() => state.products);
  const getCategories = computed(() => state.categories);
  const getActiveCategory = computed(() => state.activeCategory);
  const getPaginationMeta = computed(() => state.paginationMeta);
  const getProductsInfo = computed(() => ({
    current: getPaginationMeta.value.skip + getPaginationMeta.value.limit,
    total: getPaginationMeta.value.total,
  }));

  return {
    fetchInitialData,
    changePage,
    getProducts,
    selectCategory,
    getCategories,
    getActiveCategory,
    getPaginationMeta,
    getProductsInfo,
    searchByQuery,
    hasProducts,
    isLoading,
  };
};

export { useProducts };
