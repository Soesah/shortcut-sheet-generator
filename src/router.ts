import { createRouter, createWebHistory } from 'vue-router';
import SheetList from '@/components/SheetList.vue';
import { Actions, store } from './store';

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/*',
      component: SheetList,
    },
    {
      path: '/',
      component: SheetList,
    },
  ],
});
