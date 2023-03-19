<template>
  <ul class="products-sorting">
    <li v-for="key in sortingKeys" :key="key" class="products-sorting__item">
      <button
        class="products-sorting__button"
        :class="{ 'products-sorting__button--is-active': isSortButtonActive(key) }"
        @click="toggleSort(key)"
      >
        {{ key }}

        <font-awesome-icon
          v-if="isSortButtonActive(key)"
          icon="sort-down"
          class="products-sorting__button-icon"
          :class="{ 'products-sorting__button-icon--is-asc': isSortButtonAsc(key) }"
        />
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { ProductsSort } from '@/types/models/Product';
import type { ProductsSortKey } from '@/types/types/Product';
import { PRODUCTS_SORTING_KEYS } from '@/types/constants/Product';

export default defineComponent({
  name: 'ProductsSorting',
  emits: ['on-sort-change'],
  setup(_, { emit }) {
    const activeSort = ref<ProductsSort>({ key: 'price', status: 'inactive' });
    const sortingKeys = computed(() => PRODUCTS_SORTING_KEYS);

    const toggleSort = (key: ProductsSortKey) => {
      if (activeSort.value.key === key) {
        if (activeSort.value.status === 'inactive') {
          activeSort.value.status = 'asc';
        } else if (activeSort.value.status === 'asc') {
          activeSort.value.status = 'desc';
        } else {
          activeSort.value.status = 'inactive';
        }
      } else {
        activeSort.value = { key, status: 'asc' };
      }

      emit('on-sort-change', activeSort.value);
    };

    const isSortButtonActive = (key: ProductsSortKey) =>
      key === activeSort.value.key && activeSort.value.status !== 'inactive';
    const isSortButtonAsc = (key: ProductsSortKey) =>
      key === activeSort.value.key && activeSort.value.status === 'asc';

    return {
      activeSort,
      sortingKeys,
      isSortButtonActive,
      isSortButtonAsc,
      toggleSort,
    };
  },
});
</script>

<style lang="scss" src="./ProductsSorting.scss" />
