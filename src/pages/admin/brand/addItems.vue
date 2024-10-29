<script setup>
import { ref } from 'vue';
import { rules } from '@/utils/rules';
import { useBrandStore } from '@/stores/brand-store';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const brandStore = useBrandStore();


const router = useRouter()


const description = ref('');



const brandForm = ref()


const createProd = async () => {
  try {
    const brandData = {
    description: description.value,
    
  };
  await brandStore.createBrand(brandData)
  toast.success("Marca creada con exito")
  setTimeout(() => {
      cancel();
    }, 1500);
  } catch (error) {
    console.log(error)
  }
  
}

const cancel = () => {
  router.push({ name: 'brands'})
}

</script>


<template>
  <h3>Agregar Categoria</h3>
  <v-divider class="mt-5 mb-5"></v-divider>
  <form @submit.prevent="createProd" ref="brandForm">

    <v-text-field v-model="description" :rules="[rules.required]" label="Description"></v-text-field>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="cancel()">
      Cancel
    </v-btn>

  </form>
</template>
