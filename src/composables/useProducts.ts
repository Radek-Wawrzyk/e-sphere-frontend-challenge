import { productsService } from '@/api/services/products';
import { DEFAULT_PRODUCTS_PER_PAGE } from '@/types/constants/Product';
import { ApiResponseMeta } from '@/types/models/Api';
import { Product, ProductsSort } from '@/types/models/Product';
import { computed, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  products: <Product[]>[],
  productsCopy: <Product[]>[],
  categories: <string[]>[],
  isLoading: false,
  activeCategory: '',
  paginationMeta: <ApiResponseMeta>{
    limit: DEFAULT_PRODUCTS_PER_PAGE,
    skip: 0,
    total: 0,
  },
  sortingMeta: <ProductsSort>{
    key: 'price',
    status: 'inactive',
  },
});

const useProducts = () => {
  const router = useRouter();
  const route = useRoute();

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
    setPaginationMetaFromRoute();
    const [categories, products] = await Promise.all([fetchProductCategories(), fetchProducts()]);

    setCategories(categories);
    setProducts(products);
  };

  const setProducts = (products: Product[], clone: boolean = true) => {
    if (clone) state.productsCopy = products;
    state.products = products;
  };
  const setCategories = (categories: string[]) => {
    state.categories = categories;
  };
  const setPaginationMeta = (meta: ApiResponseMeta) => {
    state.paginationMeta = meta;
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

  const changePageSize = async (limit: string) => {
    setPaginationMeta({ ...getPaginationMeta.value, limit: Number(limit) });
    setProducts(await fetchProducts());
  };

  const changeSorting = (sortPayload: ProductsSort) => {
    if (sortPayload.status === 'inactive') {
      setProducts(state.productsCopy);
      return;
    }

    // @ts-ignore: 
    const productsToSort = [...getProducts.value].sort((a, b) => {
      if (sortPayload.status === 'asc') return a[sortPayload.key] > b[sortPayload.key] ? 1 : -1;
      else if (sortPayload.status === 'desc') return a[sortPayload.key] < b[sortPayload.key] ? 1 : -1;
      else 0
    });

    setProducts(productsToSort, false);
  };

  const searchByQuery = async (query: string) => {
    try {
      const { data } = await productsService.getAllBySearchQuery(query);
      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    } 
  };

  const setPaginationMetaFromRoute = () => {
    const metaPaginationData: any = {};

    Object.keys(route.query as unknown as ApiResponseMeta).forEach((key) => {
      metaPaginationData[key] = Number(route.query[key]);
    });

    setPaginationMeta(metaPaginationData as ApiResponseMeta);
  };

  const syncMetaWithRouter = () => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        ...getPaginationMeta.value
      },
    });
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

  watch(getPaginationMeta, () => {
    syncMetaWithRouter();
  });

  return {
    fetchInitialData,
    changePage,
    changePageSize,
    changeSorting,
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
