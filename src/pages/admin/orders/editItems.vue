<script setup>
import { onMounted, ref } from 'vue';
import { rules } from '@/utils/rules';
import { useCategoryStore } from '@/stores/category-store';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const categoryStore = useCategoryStore();

const id = useRoute().params.id
const router = useRouter()
onMounted(async () => {
  await loadCategory();

})
const form = ref({
  description: '',

})



const categoryForm = ref()

const loadCategory = async () => {
  try {
    if (!id) return cancel();
    await categoryStore.getCategById(Number(id));
    const res = categoryStore.categories
    if (res) {
      form.value = {
        description: res.description
      }
    }
  } catch (error) {
    console.log(error)
  }
}




const updateCategory = async () => {
  try {
    const categoryData = {
      description: form.value.description,
    };
    await categoryStore.editCategory(id, categoryData)
    toast.success("Categoria actualizada con exito")
    setTimeout(() => {
      cancel();
    }, 1500);
  } catch (error) {
    console.log(error)
    toast.error("Error al actualizar categoria")
  }

}

const cancel = () => {
  router.push({ name: 'categories' })
}

</script>


<template>
  <h3>Editar Categoria</h3>
  <v-divider class="mt-5 mb-5"></v-divider>
  <form @submit.prevent="updateCategory" ref="categoryForm">

    <v-text-field v-model="form.description" :rules="[rules.required]" label="Description"></v-text-field>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="cancel()">
      Cancel
    </v-btn>

  </form>

</template>
