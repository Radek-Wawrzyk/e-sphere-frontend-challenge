<template>
  <div class="app-pagination">
    <button @click="prevPage()" class="app-pagination__prev" :disabled="currentPage === 1">
      <font-awesome-icon icon="chevron-left" />
    </button>

    <ul class="app-pagination__list">
      <li
        class="app-pagination__page"
        v-for="page in pages"
        :key="page"
      >
        <button 
          @click="goToPage(page)" 
          class="app-pagination__page-button"
          :class="{ 'app-pagination__page-button--is-active': page === currentPage }"
          :title="`Go to the ${page} page`"
          :aria-label="`Go to the ${page} page`"
        >
          {{ page }}
        </button>
      </li>
    </ul>

    <button class="app-pagination__prev" @click="nextPage()" :disabled="currentPage === totalPages">
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppPagination',
  emits: ['change-page'],
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
  setup(props, { emit }) {
    const currentPage = computed(() => Math.floor(props.skip / props.limit) + 1);
    const totalPages = computed(() => Math.ceil(props.total / props.limit));

    const pages = computed(() => {
      const maxVisiblePages = 5;
      const pages = [];
  
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
