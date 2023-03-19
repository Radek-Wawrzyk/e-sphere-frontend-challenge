import { createRouter, createWebHashHistory } from 'vue-router';
import { RouterPaths, RouterNames } from '@/types/enums/Router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: RouterNames.Products,
      path: RouterPaths.Products,
      component: () =>
        import(/* webpackChunkName: "products-page" */ '@/views/Products/Products.vue'),
    },
  ],
});

export default router;
