<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user-store';

const userStore = useUserStore()
const items = [
  { title: 'Products', route: "/products", condition: () => userStore.token },
  { title: 'Categories', route: "/categories", condition: () => userStore.token },
  { title: 'Brands', route: "/brands", condition: () => userStore.token },
  { title: 'Cart', route: "/cart", condition: () => userStore.token },
  { title: 'Register', route: '/register', condition: () => !userStore.token },
  { title: 'Login', route: '/login', condition: () => !userStore.token },
]
</script>

<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Dropdown
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in items" :key="index">
          <v-list-item v-if="item.condition ? item.condition() : true">
            <RouterLink :to="item.route">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </RouterLink>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
  

 
 <div style="padding: 120px;"><RouterView /></div>
  
</template>
