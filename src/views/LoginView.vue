<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user-store.js';
import { ref } from 'vue';

const router = useRouter()
const userStore = useUserStore();
const email = ref('');
const password = ref('');

const login = () => {
  userStore.acces(email.value, password.value);
  router.push("/products")
};

</script>
<template>
  <div class="about">
    <h1>Login</h1>
    <form id="loginForm" @submit.prevent="login">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit">Acceder</button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
