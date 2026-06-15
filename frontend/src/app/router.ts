import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CreatePage from '@/pages/create/index.vue';
import GuestPage from '@/pages/guest/index.vue';

const routes = [
  { path: '/create', component: CreatePage },
  { path: '/sessions/:sessionId', component: GuestPage },
  { path: '/', redirect: '/create' },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
