import './app/styles/main.css';
import '@tabler/icons-webfont/dist/tabler-icons.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';

import App from './app/App.vue';
import router from './app/router';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Toast, {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
  })
  .mount('#app');
