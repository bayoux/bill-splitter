import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CreateDishPage from '@/pages/CreateDishPage.vue';
import GuestPage from '@/pages/GuestPage.vue';

const routes = [
  { path: '/create', component: CreateDishPage },
  { path: '/sessions/:sessionId', component: GuestPage },
  { path: '/', redirect: '/create' },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
