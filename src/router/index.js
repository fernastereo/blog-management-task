import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import DetailsView from '../views/DetailsView.vue'
import PostView from '../views/PostView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listview',
      component: ListView,
    },
    {
      path: '/details',
      name: 'detailsview',
      component: DetailsView,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/:catchall(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
