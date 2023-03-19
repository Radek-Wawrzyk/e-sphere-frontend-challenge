<template>
  <section class="products-listing">
    <ul v-if="hasProducts" class="products-listing__grid">
      <product-card
        v-for="product in getProducts"
        :key="product.id"
        :name="product.title"
        :description="product.description"
        :price="product.price"
        :discount-percentage="product.discountPercentage"
        :rating="product.rating"
        :thumbnail="product.thumbnail"
      />
    </ul>

    <p v-else class="products-listing__empty">No products...</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProducts } from '@/composables/useProducts';

import ProductCard from '@/components/Product/ProductCard/ProductCard.vue';

export default defineComponent({
  name: 'ProductsListing',
  components: {
    ProductCard,
  },
  setup() {
    const { getProducts, hasProducts } = useProducts();

    return {
      getProducts,
      hasProducts,
    };
  },
});
</script>

<style lang="scss" scoped src="./ProductsListing.scss" />
