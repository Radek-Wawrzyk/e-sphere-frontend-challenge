<template>
  <div class="products-page">
    <div class="container">
      <header class="products-page__header">
        <h1 class="products-page__header-title">
          Front End Challenge
        </h1>
        
        <products-filtration />

        <div class="products-page__sorting">
          Todo: Sort component here
        </div>
      </header>

      <products-listing />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useProducts } from '@/composables/useProducts';

import ProductsFiltration from '@/components/Product/ProductsFiltration/ProductsFiltration.vue';
import ProductsListing from '@/components/Product/ProductsListing/ProductsListing.vue';

export default defineComponent({
  name: 'ProductsView',
  components: {
    ProductsFiltration,
    ProductsListing,
  },
  setup() {
    const { fetchInitialData } = useProducts();

    onMounted(async () => {
      await fetchInitialData();
    });
  },
})
</script>

<style lang="scss" scoped src="./Products.scss" />
