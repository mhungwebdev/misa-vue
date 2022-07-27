import { createRouter, createWebHistory } from 'vue-router'
import EmployeePage from '../views/EmployeePage.vue'
import CustomerPage from '../views/CustomerPage.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/employees',component:EmployeePage},
    { path:'/customers',component:CustomerPage},
    {path:'/', redirect:'/employees'},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
