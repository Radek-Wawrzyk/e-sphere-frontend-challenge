<template>
  <main class="app">
    <router-view />
  </main>

  <app-loader />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLoader from './components/App/AppLoader/AppLoader.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppLoader,
  },
});
</script>
