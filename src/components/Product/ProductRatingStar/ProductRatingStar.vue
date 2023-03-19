<template>
  <li class="product-rating-star">
    <svg viewBox="0 0 11 10" preserveAspectRatio="none" class="product-rating-star__inner">
      <path
        d="M5.5 0l1.235 3.8h3.996L7.498 6.15l1.235 3.8L5.5 7.6 2.267 9.95l1.235-3.8L.269 3.8h3.996L5.5 0z"
        :fill="isFilled ? '#0090FF' : '#ffffff'"
        class="base-star__inner"
      />
    </svg>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ProductRatingStar',
  props: {
    isFilled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => false,
    },
  },
});
</script>

<style lang="scss" scoped src="./ProductRatingStar.scss" />
