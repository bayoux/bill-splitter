import './assets/main.css';
import '@tabler/icons-webfont/dist/tabler-icons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

createApp(App)
  .use(router)
  .use(Toast, {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
  })
  .mount('#app');
