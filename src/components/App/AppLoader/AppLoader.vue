<template>
  <div class="app-loader">
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" class="app-loader__inner">
        <div class="app-loader__icon-wrapper">
          <svg viewBox="25 25 50 50" class="app-loader__icon">
            <circle cx="50" cy="50" r="20" fill="none" class="app-loader__icon-circle" />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useLoader } from '@/composables/useLoader';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLoader',
  setup() {
    const { isLoading } = useLoader();

    return {
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped src="./AppLoader.scss" />
