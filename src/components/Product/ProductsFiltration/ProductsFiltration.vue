<template>
  <div class="products-filtration">
    <app-input 
      v-model="searchQuery" 
      label="Search:" 
      title="Search any product" 
      placeholder="What are you looking for?"
      class="products-filtration__search" 
    />

    <app-select 
      v-model="selectedCategory" 
      label="Category:" 
      :options="getCategories"
      title="Select a product category" 
      placeholder="Select category"
      class="products-filtration__category"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useProducts } from '@/composables/useProducts';

import AppInput from '@/components/App/AppInput/AppInput.vue';
import AppSelect from '@/components/App/AppSelect/AppSelect.vue';

export default defineComponent({
  name: 'ProductsFiltration',
  components: {
    AppInput,
    AppSelect,
  },
  props: {},
  setup () {
    const { getCategories } = useProducts();
    const searchQuery = ref('');
    const selectedCategory = ref('');
    
    return {
      searchQuery,
      selectedCategory,
      getCategories,
    };
  },
})
</script>

<style lang="scss" scoped src="./ProductsFiltration.scss" />
