import { createRouter, createWebHistory } from 'vue-router';
import SheetSelector from '@/components/SheetSelector.vue';
import { Actions, store } from './store';

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/*',
      component: SheetSelector,
    },
    {
      path: '/',
      component: SheetSelector,
    },
  ],
});
