<template>
  <div class="products-filtration">
    <app-input
      :model-value="getSearchQuery"
      label="Search:"
      title="Search any product"
      placeholder="What are you looking for?"
      class="products-filtration__search"
      @update:model-value="search($event)"
    />

    <app-select
      :model-value="getActiveCategory"
      label="Category:"
      :options="getCategories"
      title="Select a product category"
      placeholder="Select category"
      class="products-filtration__category"
      @update:model-value="setCategory($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { SEARCH_DEBONCE_TIMING } from '@/types/constants/Search';
import debounce from 'lodash.debounce';

import AppInput from '@/components/App/AppInput/AppInput.vue';
import AppSelect from '@/components/App/AppSelect/AppSelect.vue';

export default defineComponent({
  name: 'ProductsFiltration',
  components: {
    AppInput,
    AppSelect,
  },
  setup() {
    const {
      getCategories,
      getSearchQuery,
      setCategory,
      setQuery,
      searchByQuery,
      getActiveCategory,
    } = useProducts();

    const search = debounce((query: string) => {
      setQuery(query);
      searchByQuery(query);
    }, SEARCH_DEBONCE_TIMING);

    return {
      search,
      getCategories,
      getActiveCategory,
      setCategory,
      setQuery,
      getSearchQuery,
    };
  },
});
</script>

<style lang="scss" scoped src="./ProductsFiltration.scss" />
