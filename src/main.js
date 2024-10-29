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
      component: () => import('./pages/professions/Index.vue'),
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('./pages/depatments/Index.vue'),
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('./pages/employees/Index.vue'),
    },
    {
      path: '/professions/:id',
      component: () => import('./pages/professions/Show.vue'),
    },
    {
      path: '/departments/:id',
      component: () => import('./pages/depatments/Show.vue'),
    },
    {
      path: '/employees/:id',
      component: () => import('./pages/employees/Show.vue'),
    },
    {
      path: '/employees/:id/edit',
      component: () => import('./pages/employees/Edit.vue'),
    },
    {
      path: '/departments/:id/edit',
      component: () => import('./pages/depatments/Edit.vue'),
    },
    {
      path: '/professions/:id/edit',
      component: () => import('./pages/professions/Edit.vue'),
    },
    {
      path: '/employees/create',
      component: () => import('./pages/employees/Create.vue'),
    },
    {
      path: '/departments/create',
      component: () => import('./pages/depatments/Create.vue'),
    },
    {
      path: '/professions/create',
      component: () => import('./pages/professions/Create.vue'),
    },
  ],
})
app.use(router)
app.mount('#app')
