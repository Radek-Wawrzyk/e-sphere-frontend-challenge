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
      v-model="category" 
      label="Category:" 
      :options="getCategories"
      title="Select a product category" 
      placeholder="Select category"
      class="products-filtration__category"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useProducts } from '@/composables/useProducts';
import debounce from 'lodash.debounce';

import AppInput from '@/components/App/AppInput/AppInput.vue';
import AppSelect from '@/components/App/AppSelect/AppSelect.vue';

export default defineComponent({
  name: 'ProductsFiltration',
  components: {
    AppInput,
    AppSelect,
  },
  setup () {
    const { getCategories, selectCategory, searchByQuery } = useProducts();
    const searchQuery = ref('');
    const category = ref('');

    watch(category, () => {
      selectCategory(category.value);
    });

    watch(searchQuery, () => {
      search();
    });

    const search = debounce(() => {
      searchByQuery(searchQuery.value);
    }, 500);
    
    return {
      searchQuery,
      category,
      getCategories,
    };
  },
})
</script>

<style lang="scss" scoped src="./ProductsFiltration.scss" />
