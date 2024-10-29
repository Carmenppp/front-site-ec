import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/products',
      name: 'products',
      meta: {
        auth: true
      },
      component: () => import('../pages/client/products/productsList.vue')
    },
    {
      path: '/products/add',
      name: 'products add',
      meta: {
        auth: true
      },
      component: () => import('../pages/client/products/addItems.vue')
    },
    {
      path: '/products/edit/:id',
      name: 'products edit',
      meta: {
        auth: true
      },
      component: () => import('../pages/client/products/editItems.vue')
    }, 
    {
      path: '/categories',
      name: 'categories',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/categories/categoryList.vue')
    },
    {
      path: '/categories/add',
      name: 'categories add',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/categories/addItems.vue')
    },
    {
      path: '/categories/edit/:id',
      name: 'categories edit',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/categories/editItems.vue')
    },
    {
      path: '/brands',
      name: 'brands',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/brand/brandList.vue')
    },
    {
      path: '/brands/add',
      name: 'brands add',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/brand/addItems.vue')
    },
    {
      path: '/brands/edit/:id',
      name: 'brands edit',
      meta: {
        auth: true
      },
      component: () => import('../pages/admin/brand/editItems.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  const userStore = useUserStore();
  if (localStorage.getItem('token')) {
    if (requireAuth) {
      //validar token
      if (userStore.token) {
        return next();
      }
      return next("/login")
    } else {
      return next()
    }
  }
  next();
})

export default router
