<template>
  <div class="products-page">
    <div class="container">
      <header class="products-page__header">
        <h1 class="products-page__header-title">
          Front End Challenge
        </h1>

        <div class="products-page__filtration">
          Todo: Filtration component here
        </div>

        <div class="products-page__sorting">
          Todo: Sort component here
        </div>
      </header>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { productsService } from '@/api/services/products';

export default defineComponent({
  name: 'ProductsView',
  setup() {
    onMounted(() => {
      productsService.getAllCategories().then((response) => {
        console.log(response);
      })
    })
  }
})
</script>

<style scoped>

</style>