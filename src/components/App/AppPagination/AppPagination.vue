<template>
  <div class="app-pagination">
    <button class="app-pagination__prev" :disabled="currentPage === 1" @click="prevPage()">
      <font-awesome-icon icon="chevron-left" />
    </button>

    <ul class="app-pagination__list">
      <li v-for="page in pages" :key="page" class="app-pagination__page">
        <button
          class="app-pagination__page-button"
          :class="{ 'app-pagination__page-button--is-active': page === currentPage }"
          :title="`Go to the ${page} page`"
          :aria-label="`Go to the ${page} page`"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>

    <button class="app-pagination__prev" :disabled="currentPage === totalPages" @click="nextPage()">
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { PAGINATION_MAX_VISIBLE_PAGES } from '@/types/constants/Pagination';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppPagination',
  props: {
    limit: {
      type: Number as PropType<number>,
      required: true,
    },
    skip: {
      type: Number as PropType<number>,
      required: true,
    },
    total: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  emits: ['change-page'],
  setup(props, { emit }) {
    const currentPage = computed(() => Math.floor(props.skip / props.limit) + 1);
    const totalPages = computed(() => Math.ceil(props.total / props.limit));

    const pages = computed(() => {
      const maxVisiblePages = PAGINATION_MAX_VISIBLE_PAGES;
      const pages: number[] = [];

      let start = currentPage.value - 2;
      let end = currentPage.value + 2;

      if (start < 1) {
        start = 1;
        end = Math.min(maxVisiblePages, totalPages.value);
      } else if (end > totalPages.value) {
        start = Math.max(1, totalPages.value - maxVisiblePages + 1);
        end = totalPages.value;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        emit('change-page', (page - 1) * props.limit);
      }
    };

    const nextPage = () => {
      goToPage(currentPage.value + 1);
    };

    const prevPage = () => {
      goToPage(currentPage.value - 1);
    };

    return {
      currentPage,
      pages,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
    };
  },
});
</script>

<style lang="scss" scoped src="./AppPagination.scss" />
