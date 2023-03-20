<template>
  <div class="product-price">
    <span v-if="hasDiscount" class="product-price__new">
      {{ priceAfterDiscount }}
    </span>

    <span
      class="product-price__original"
      :class="{ 'product-price__original--is-discounted': hasDiscount }"
    >
      {{ normalPrice }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getFormattedPrice, getPriceAfterDiscount } from '@/helpers/';

export default defineComponent({
  name: 'ProductPrice',
  props: {
    price: {
      type: Number as PropType<number>,
      required: false,
      default: () => 0,
    },
    discountPercentage: {
      type: Number as PropType<number>,
      required: false,
      default: () => 0,
    },
  },
  setup(props) {
    const priceAfterDiscount = computed(() =>
      getFormattedPrice(getPriceAfterDiscount(props.price, props.discountPercentage))
    );
    const normalPrice = computed(() => getFormattedPrice(props.price));
    const hasDiscount = computed(() => props.discountPercentage > 0);

    return {
      priceAfterDiscount,
      hasDiscount,
      normalPrice,
    };
  },
});
</script>

<style lang="scss" scoped src="./ProductPrice.scss" />
