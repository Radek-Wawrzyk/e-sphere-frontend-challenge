import { productsService } from '@/api/services/products';
import {
  PRODUCTS_DEFAULT_PAGINATION_META,
  PRODUCTS_DEFAULT_SORT_META,
} from '@/types/constants/Product';
import { Product, ProductsSort, ProductPaginationMeta } from '@/types/models/Product';
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPriceAfterDiscount } from '@/helpers';

const state = reactive({
  products: <Product[]>[],
  productsCopy: <Product[]>[],
  categories: <string[]>[],
  isLoading: false,
  activeCategory: '',
  paginationMeta: PRODUCTS_DEFAULT_PAGINATION_META,
  sortingMeta: PRODUCTS_DEFAULT_SORT_META,
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

      setPaginationMeta({ limit: data.limit, total: data.total, skip: data.skip });
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

  const setProducts = (products: Product[], clone = true) => {
    if (clone) state.productsCopy = products;
    state.products = products;
  };
  const setCategories = (categories: string[]) => {
    state.categories = categories;
  };
  const setPaginationMeta = (meta: ProductPaginationMeta) => {
    state.paginationMeta = meta;
    syncMetaWithRouter();
  };

  const setCategory = (category: string) => {
    state.activeCategory = category;

    if (category) fetchProductsByCategory();
    else fetchProducts();
  };

  const setPage = async (skip: number) => {
    setPaginationMeta({ ...getPaginationMeta.value, skip });
    setProducts(await fetchProducts());
  };

  const setPageSize = async (limit: string) => {
    setPaginationMeta({ ...getPaginationMeta.value, limit: Number(limit) });
    setProducts(await fetchProducts());
  };

  const setSorting = (sortPayload: ProductsSort) => {
    state.sortingMeta = sortPayload;
  };

  const searchByQuery = async (query: string) => {
    try {
      const { data } = await productsService.getAllBySearchQuery(query);

      setPaginationMeta({ limit: data.limit, total: data.total, skip: data.skip });
      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    }
  };

  const setPaginationMetaFromRoute = () => {
    const metaPaginationData: any = {};

    Object.keys(route.query as unknown as ProductPaginationMeta).forEach((key) => {
      metaPaginationData[key] = Number(route.query[key]);
    });

    if (Object.keys(metaPaginationData).length)
      setPaginationMeta(metaPaginationData as ProductPaginationMeta);
  };

  const syncMetaWithRouter = () => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        ...getPaginationMeta.value,
      },
    });
  };

  const hasMorePages = computed(
    () => getPaginationMeta.value.total / getPaginationMeta.value.limit > 1
  );
  const hasProducts = computed(() => !!state.products.length);
  const isLoading = computed(() => state.isLoading);

  const getCategories = computed(() => state.categories);
  const getActiveCategory = computed(() => state.activeCategory);
  const getPaginationMeta = computed(() => state.paginationMeta);
  const getSortingMeta = computed(() => state.sortingMeta);
  const getProductsInfo = computed(() => ({
    current: getPaginationMeta.value.skip + getPaginationMeta.value.limit,
    total: getPaginationMeta.value.total,
  }));

  const getProducts = computed(() => {
    if (getSortingMeta.value.status === 'inactive') return state.products;

    const copiedProducts = [...state.products];

    if (getSortingMeta.value.key !== 'price') {
      return copiedProducts.sort((a, b) => {
        if (getSortingMeta.value.status === 'asc')
          return a[getSortingMeta.value.key] > b[getSortingMeta.value.key] ? 1 : -1;
        else getSortingMeta.value.status === 'desc';
        return a[getSortingMeta.value.key] < b[getSortingMeta.value.key] ? 1 : -1;
      });
    }

    return copiedProducts.sort((a, b) => {
      const priceA = getPriceAfterDiscount(a.price, a.discountPercentage);
      const priceB = getPriceAfterDiscount(b.price, b.discountPercentage);

      if (getSortingMeta.value.status === 'asc') {
        return priceA > priceB ? 1 : -1;
      }

      return priceA < priceB ? 1 : -1;
    });
  });

  return {
    setPage,
    setPageSize,
    setSorting,
    setCategory,
    getProducts,
    getCategories,
    getActiveCategory,
    getPaginationMeta,
    getProductsInfo,
    hasProducts,
    hasMorePages,
    fetchInitialData,
    searchByQuery,
    isLoading,
  };
};

export { useProducts };
