import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/login-page/vue/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
