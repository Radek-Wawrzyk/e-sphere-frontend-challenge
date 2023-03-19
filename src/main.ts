import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import FontAwesomeIcon from '@/plugins/font-awesome';

import '@/styles/index.scss';

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
