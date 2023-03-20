<template>
  <li class="product-card">
    <figure class="product-card__thumbnail">
      <img :src="thumbnail" :alt="name" class="product-card__thumbnail-image" />
    </figure>

    <div class="product-card__content">
      <div class="product-card__details">
        <h3 class="product-card__name">
          {{ name }}
        </h3>

        <p class="product-card__description">
          {{ description }}
        </p>
      </div>

      <div class="product-card__info">
        <product-price
          class="product-card__info-price"
          :price="price"
          :discount-percentage="discountPercentage"
        />

        <product-rating :rating="rating" :max-rating="5" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ProductPrice from '../ProductPrice/ProductPrice.vue';
import ProductRating from '@/components/Product/ProductRating/ProductRating.vue';

export default defineComponent({
  name: 'ProductCard',
  components: {
    ProductPrice,
    ProductRating,
  },
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    description: {
      type: String as PropType<string>,
      required: true,
    },
    thumbnail: {
      type: String as PropType<string>,
      required: true,
    },
    price: {
      type: Number as PropType<number>,
      required: true,
    },
    rating: {
      type: Number as PropType<number>,
      required: true,
    },
    discountPercentage: {
      type: Number as PropType<number>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped src="./ProductCard.scss" />
