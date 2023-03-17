<template>
  <div class="product-rating">
    <ul class="product-rating__list">
      <product-rating-star
        v-for="index in maxRating"
        class="product-rating__star"
        :key="`star-${index}`"
        :is-filled="isFilled(index, finalRating)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, PropType } from 'vue'

import ProductRatingStar from '@/components/Product/ProductRatingStar/ProductRatingStar.vue';

export default defineComponent({
  name: 'ProductRating',
  components: {
    ProductRatingStar,
  },
  props: {
    rating: {
      type: Number as PropType<number>,
      required: false,
      default: () => 0,
    },
    maxRating: {
      type: Number as PropType<number>,
      required: false,
      default: () => 5,
    },
  },
  setup(props) {
    const isFilled = (starIndex: number, rating: number) => starIndex <= rating;

    const finalRating = computed(() => {
      if (!props.rating) return 0;
      else if (props.rating < 0) return 0;
      else if (props.rating > props.maxRating && props.maxRating > 0) return props.maxRating;
      else if (props.maxRating <= 0) return 0;
  
      return props.rating;
    });

    return {
      isFilled,
      finalRating,
    };
  },
});
</script>

<style lang="scss" scoped src="./ProductRating.scss" />
