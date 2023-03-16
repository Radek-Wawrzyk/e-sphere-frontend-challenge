<template>
  <div>
    products
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