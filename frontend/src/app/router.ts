import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CreatePage from '@/pages/create/index.vue';
import GuestPage from '@/pages/guest/index.vue';
import AllSessions from '@/pages/all-sessions/index.vue';
import SessionManage from '@/pages/session-manage/index.vue';
import RegisterPage from '@/pages/register/index.vue';
import LoginPage from '@/pages/login/index.vue';
import StartPage from '@/pages/start-page/index.vue';
import { useAuth } from '@/entities/user';

const routes = [
  {
    path: '/sessions/new',
    component: CreatePage,
    meta: { showHeader: true, requiresAuth: true },
  },
  {
    path: '/sessions/:sessionId',
    component: GuestPage,
    meta: { showHeader: true },
  },
  {
    path: '/dashboard',
    component: AllSessions,
    meta: { showHeader: true, requiresAuth: true },
  },
  {
    path: '/sessions/:sessionId/manage',
    component: SessionManage,
    meta: { showHeader: true, requiresAuth: true },
  },
  { path: '/', component: StartPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return '/';
  }
});

export default router;
