import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home.vue'),
    },
    {
      path: '/professions',
      name: 'professions',
      component: () => import('./pages/Professions.vue'),
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('./pages/Departments.vue'),
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('./pages/Employees.vue'),
    },
    {
      path: '/professions/:id',
      component: () => import('./pages/Profession.vue'),
    },
    {
      path: '/departments/:id',
      component: () => import('./pages/Department.vue'),
    },
    {
      path: '/employees/:id',
      component: () => import('./pages/Employee.vue'),
    },
  ],
})
app.use(router)
app.mount('#app')
