<template>
  <div class="products-page">
    <div class="container">
      <header class="products-page__header">
        <h1 class="products-page__header-title">
          Front End Challenge
        </h1>
        
        <products-filtration class="products-page__header-filters" />
        <hr class="products-page__header-line" />

        <div class="products-page__sorting">
          <products-sorting class="products-page__sorting-actions" />
          <span class="products-page__sorting-info" v-if="hasProducts">
            {{ resultsText }}
          </span>
        </div>
        
      </header>

      <products-listing class="products-page__listing" />

      <footer class="products-page__bottom">
        <app-select 
          class="products-page__bottom-select" 
          :options="productsPerPage"
        />

        <div class="products-page__bottom-pagination-wrapper">
          <app-pagination 
            class="products-page__bottom-pagination" 
            :skip="getPaginationMeta.skip"
            :limit="getPaginationMeta.limit"
            :total="getPaginationMeta.total"
            @change-page="changePage($event)"
          />
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { PRODUCTS_PER_PAGE } from '@/types/constants/Product';

import ProductsFiltration from '@/components/Product/ProductsFiltration/ProductsFiltration.vue';
import ProductsListing from '@/components/Product/ProductsListing/ProductsListing.vue';
import ProductsSorting from '@/components/Product/ProductsSorting/ProductsSorting.vue';
import AppSelect from '@/components/App/AppSelect/AppSelect.vue';
import AppPagination from '@/components/App/AppPagination/AppPagination.vue';

export default defineComponent({
  name: 'ProductsView',
  components: {
    ProductsFiltration,
    ProductsListing,
    ProductsSorting,
    AppSelect,
    AppPagination,
  },
  setup() {
    const { 
      fetchInitialData, 
      getPaginationMeta, 
      changePage,
      getProductsInfo,
      hasProducts,
    } = useProducts();

    const resultsText = computed(() => `${getProductsInfo.value.current} of ${getProductsInfo.value.total}`);
    const productsPerPage = PRODUCTS_PER_PAGE;
  
    onMounted(async () => {
      await fetchInitialData();
    });

    return {
      productsPerPage,
      getPaginationMeta,
      changePage,
      getProductsInfo,
      resultsText,
      hasProducts,
    };
  },
})
</script>

<style lang="scss" scoped src="./Products.scss" />
