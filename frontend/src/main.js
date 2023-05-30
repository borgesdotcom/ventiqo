import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { themeStore } from './store/themeStore';
import { VueReCaptcha } from 'vue-recaptcha-v3';

createApp(App)
  .use(store)
  .use(themeStore)
  .use(router)
  .use(VueReCaptcha, { siteKey: '6Ld2dTUmAAAAAGWCoZfbPqU4R29wY7UagVZDbgiH' })
  .mount('#app');
