import { productsService } from '@/api/services/products';
import {
  PRODUCTS_DEFAULT_PAGINATION_META,
  PRODUCTS_DEFAULT_SORT_META,
} from '@/types/constants/Product';
import { Product, ProductsSort, ProductPaginationMeta } from '@/types/models/Product';
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPriceAfterDiscount } from '@/helpers';
import { ApiProductsResponse } from '@/types/models/Api';
import { AxiosResponse } from 'axios';
import { useLoader } from './useLoader';

const state = reactive({
  products: <Product[]>[],
  categories: <string[]>[],
  activeCategory: '',
  paginationMeta: PRODUCTS_DEFAULT_PAGINATION_META,
  sortingMeta: PRODUCTS_DEFAULT_SORT_META,
  query: '',
});

const useProducts = () => {
  const router = useRouter();
  const route = useRoute();
  const { setLoader } = useLoader();

  const fetchProductCategories = async (): Promise<string[]> => {
    try {
      const response = await productsService.getAllCategories();
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  };

  const fetchProducts = async (loader = false): Promise<Product[]> => {
    if (loader) setLoader(true);

    try {
      const { data } = await productsService.getAll({
        limit: getPaginationMeta.value.limit,
        skip: getPaginationMeta.value.skip,
      });

      setPaginationMeta({ limit: data.limit, total: data.total, skip: data.skip });
      return data.products;
    } catch (err) {
      throw new Error('Error');
    } finally {
      if (loader) setLoader(false);
    }
  };

  const fetchProductsByCategory = async (loader = false) => {
    if (loader) setLoader(true);

    try {
      const { data } = await productsService.getAllByCategory(state.activeCategory);

      setPaginationMeta({ limit: data.limit, total: data.total, skip: data.skip });
      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    } finally {
      if (loader) setLoader(false);
    }
  };

  const fetchInitialData = async () => {
    setPaginationMetaFromRoute();
    setLoader(true);
    const [categories, products] = await Promise.all([fetchProductCategories(), fetchProducts()]);

    setCategories(categories);
    setProducts(products);
    setLoader(false);
  };

  const setProducts = (products: Product[]) => {
    state.products = products;
  };

  const setCategories = (categories: string[]) => {
    state.categories = categories;
  };

  const setPaginationMeta = (meta: ProductPaginationMeta) => {
    state.paginationMeta = meta;
    syncMetaWithRouter();
  };

  const setCategory = async (category: string) => {
    if (category.length) {
      state.activeCategory = category;
      fetchProductsByCategory(true);
      return;
    }

    setPaginationMeta(PRODUCTS_DEFAULT_PAGINATION_META);
    setProducts(await fetchProducts(true));
  };

  const setPage = async (skip: number) => {
    setPaginationMeta({ ...getPaginationMeta.value, skip });
    setProducts(await fetchProducts(true));
  };

  const setPageSize = async (limit: string) => {
    setPaginationMeta({ ...getPaginationMeta.value, limit: Number(limit) });
    setProducts(await fetchProducts(true));
  };

  const setSorting = (sortPayload: ProductsSort) => {
    state.sortingMeta = sortPayload;
  };

  const searchByQuery = async (query?: string) => {
    setLoader(true);

    try {
      let response: AxiosResponse<ApiProductsResponse>;

      if (query && query.length) {
        response = await productsService.getAllBySearchQuery({
          limit: 100,
          skip: 0,
          q: query,
        });

        const { data } = response;

        setPaginationMeta({
          limit: data.limit,
          total: data.total,
          skip: data.skip,
          q: query,
        });

        setProducts(data.products);
        return;
      }

      response = await productsService.getAll(PRODUCTS_DEFAULT_PAGINATION_META);
      const { data } = response;

      setPaginationMeta({
        limit: data.limit,
        total: data.total,
        skip: data.skip,
      });

      setProducts(data.products);
    } catch (err) {
      throw new Error('Error');
    } finally {
      setLoader(false);
    }
  };

  const setPaginationMetaFromRoute = () => {
    const metaPaginationData: any = {};

    Object.keys(route.query as unknown as ProductPaginationMeta).forEach((key) => {
      metaPaginationData[key] = key == 'q' ? route.query[key] : Number(route.query[key]);
    });

    if (Object.keys(metaPaginationData).length)
      setPaginationMeta(metaPaginationData as ProductPaginationMeta);
  };

  const setQuery = (query: string) => {
    state.query = query;
  };

  const syncMetaWithRouter = () => {
    router.replace({
      path: route.path,
      query: {
        ...getPaginationMeta.value,
      },
    });
  };

  const hasMorePages = computed(
    () => getPaginationMeta.value.total / getPaginationMeta.value.limit > 1
  );
  const hasProducts = computed(() => !!state.products.length);
  const isSearchMode = computed(() => !!getPaginationMeta.value.q);

  const getCategories = computed(() => state.categories);
  const getSearchQuery = computed(() => state.query);
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
    setQuery,
    getProducts,
    getSearchQuery,
    getCategories,
    getActiveCategory,
    getPaginationMeta,
    getProductsInfo,
    hasProducts,
    hasMorePages,
    isSearchMode,
    fetchInitialData,
    searchByQuery,
  };
};

export { useProducts };
