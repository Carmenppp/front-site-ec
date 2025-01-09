<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user-store.js';
import { rules } from '@/utils/rules';
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
  <form  @submit.prevent="login">
    <v-text-field
      v-model="email"
      label="Email"
      :rules="[rules.required]"
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="password"
      :rules="[rules.required]"
      type="password"
    ></v-text-field>

    
    <v-btn
      class="me-4"
    >
      Acceder
    </v-btn>
  </form>
</template>

