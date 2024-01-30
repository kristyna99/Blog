import { createRouter, createWebHistory } from 'vue-router';
import BlogPostPage from '@/BlogPostPage.vue';

const routes = [
  {
    path: '/',
    name: 'BlogPostPage',
    component: BlogPostPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
