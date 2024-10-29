<script setup>
import { onMounted, ref } from 'vue';
import { rules } from '@/utils/rules';
import { useBrandStore } from '@/stores/brand-store';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const brandStore = useBrandStore();

const id = useRoute().params.id
const router = useRouter()
onMounted(async () => {
  await loadBrand();

})
const form = ref({
  description: '',

})



const categoryForm = ref()

const loadBrand = async () => {
  try {
    if (!id) return cancel();
    await brandStore.getBrandById(Number(id));
    const res = brandStore.brands
    if (res) {
      form.value = {
        description: res.description
      }
    }
  } catch (error) {
    console.log(error)
  }
}




const updateBrand = async () => {
  try {
    const brandData = {
      description: form.value.description,
    };
    await brandStore.editBrand(id, brandData)
    toast.success("Marca actualizada con exito")
    setTimeout(() => {
      cancel();
    }, 1500);
  } catch (error) {
    console.log(error)
    toast.error("Error al actualizar marca")
  }

}

const cancel = () => {
  router.push({ name: 'brands' })
}

</script>


<template>
  <h3>Editar Marca</h3>
  <v-divider class="mt-5 mb-5"></v-divider>
  <form @submit.prevent="updateBrand" ref="categoryForm">

    <v-text-field v-model="form.description" :rules="[rules.required]" label="Description"></v-text-field>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="cancel()">
      Cancel
    </v-btn>

  </form>

</template>
