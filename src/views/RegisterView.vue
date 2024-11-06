
<template>
    <form @submit.prevent="createUser()" ref="registerForm"> 
      <v-text-field :rules="[rules.required]"
        v-model="username"
        label="Username"
      ></v-text-field>
      <v-text-field :rules="[rules.required]"
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        label="E-mail"
      ></v-text-field>
  
      <v-select v-model="idCity" :rules="[rules.required]" :items="options.city" item-title="description" item-value="id"
      label="Select City"></v-select>
  
      <v-select v-model="idAddress" :rules="[rules.required]" :items="options.address" item-title="description" item-value="id"
      label="Select address"></v-select>
      <v-select v-model="idRole" :rules="[rules.required]" :items="options.role" item-title="description" item-value="id"
      label="Select role"></v-select>
      <v-btn
      type="submit"
        class="me-4"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </template>
  <script setup>
  import { onMounted, ref } from 'vue';
  import { rules } from '@/utils/rules';
  import { useUserStore } from '@/stores/user-store';
  import { useRoleStore } from '@/stores/role-store';
  import { useShippingStore } from '@/stores/shipping-store';
  import { useCitiesStore } from '@/stores/cities-store';
  import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
  const userStore = useUserStore()
  const roleStore = useRoleStore()
  const shippingAddress = useShippingStore()
  const cityStore = useCitiesStore()

const router = useRouter()
  onMounted(() => {
  loadAddress(),
    loadCity(),
    loadRole()
})
const username = ref('');
const email = ref('');
const password = ref('');
const idCity = ref(null);
const idRole = ref(null)
const idAddress = ref(null)


const registerForm = ref()
const options = ref({
  city: [],
  role: [],
  address: [],
})




const loadRole = async () => {
  try {
    await roleStore.getRole();
    options.value.role = roleStore.role;
  } catch (error) {
    console.log(error)
  }
}

const loadCity = async () => {
  try {
    await cityStore.getCity();
    options.value.city = cityStore.cities;
  } catch (error) {
    console.log(error)
  }
}
const loadAddress = async () => {
  try {
    await shippingAddress.getShippingAd()
    options.value.address = shippingAddress.shippingAd
  } catch (error) {
    console.log(error)
  }
}

const createUser = async () => {
  try {
    const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
    cityId: idCity.value,
    roleId: idRole.value,
    addressId: idAddress.value,
  };
  console.log(userData)
  await userStore.register(userData)
  toast.success("Usuario creado con exito")
  setTimeout(() => {
    router.push('products')
    }, 1500);
  } catch (error) {
    console.log(error)
  }
  
}


  </script>