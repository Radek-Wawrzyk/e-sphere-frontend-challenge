<template>
  <li class="product-card">
    <figure class="product-card__thumbnail">
      <img :src="thumbnail" :alt="name" class="product-card__thumbnail-image" />
    </figure>

    <div class="product-card__content">
      <h3 class="product-card__name">
        {{ name }}
      </h3>

      <p class="product-card__description">
        {{ description }}
      </p>

      <div class="product-card__info">
        <product-price
          class="product-card__info-price"
          :price="price" 
          :discount-percentage="discountPercentage"
        />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ProductPrice from '../ProductPrice/ProductPrice.vue';
// import AppRating from '@/components/App/AppRating/AppRating.vue';

export default defineComponent({
  name: 'ProductCard',
  components: {
    ProductPrice,
    // AppRating,
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
  setup () {
    

    return {}
  }
})
</script>

<style lang="scss" scoped src="./ProductCard.scss" />
