import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import DetailsView from '../views/DetailsView.vue'

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
  ],
})

export default router
