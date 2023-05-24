import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { VueReCaptcha } from 'vue-recaptcha-v3';

createApp(App)
  .use(store)
  .use(router)
  .use(VueReCaptcha, { siteKey: 'null' })
  .mount('#app');
