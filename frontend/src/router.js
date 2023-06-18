import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/login-page/vue/LoginPage.vue';
import MainPage from './views/main-page/vue/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'MainPage',
    component: MainPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
