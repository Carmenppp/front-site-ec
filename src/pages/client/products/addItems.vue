<script setup>
import { onMounted, ref } from 'vue';
import { rules } from '@/utils/rules';
import { useProductStore } from '@/stores/product-store';
import { useBrandStore } from '@/stores/brand-store';
import { useCategoryStore } from '@/stores/category-store';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const productStore = useProductStore();
const brandStore = useBrandStore();
const categoryStore = useCategoryStore();


const router = useRouter()
onMounted(() => {
  loadBrand(),
    loadCategory()
})
const name = ref('');
const description = ref('');
const price = ref(0);
const stock = ref(0);
const imageUrl = ref('')
const idCategory = ref(null)
const brandId = ref(null)

const options = ref({
  brand: [],
  category: []
})

const productForm = ref()

async function validateForm() {
  const { valid } = await productForm.value.validate()
  return valid
}

const loadCategory = async () => {
  try {
    await categoryStore.getCategory();
    options.value.category = categoryStore.categories;
  } catch (error) {
    console.log(error)
  }
}
const loadBrand = async () => {
  try {
    await brandStore.getBrand()
    options.value.brand = brandStore.brands
  } catch (error) {
    console.log(error)
  }
}

const createProd = async () => {
  try {
    if (!(await validateForm())) return
    const productData = {
    name: name.value,
    description: description.value,
    price: price.value,
    stock: stock.value,
    imageUrl: imageUrl.value,
    idCategory: idCategory.value,
    brandId: brandId.value
  };
  await productStore.createProd(productData)
  toast.success("Producto creado con exito")
  setTimeout(() => {
      cancel();
    }, 1500);
  } catch (error) {
    console.log(error)
  }
  
}

const cancel = () => {
  router.push({ name: 'products'})
}

</script>


<template>
  <h3>Agregar Producto</h3>
  <v-divider class="mt-5 mb-5"></v-divider>
  <form @submit.prevent="createProd" ref="productForm" title="Agregar producto">
    <v-text-field v-model="name" :rules="[rules.required]" label="Name"></v-text-field>

    <v-text-field v-model="description" :rules="[rules.required]" label="Description"></v-text-field>

    <v-text-field v-model="price" :rules="[rules.required]" label="price"></v-text-field>

    <v-text-field v-model="stock" :rules="[rules.required]" label="Stock"></v-text-field>
    <v-text-field v-model="imageUrl" :rules="[rules.required]" label="Image Url"></v-text-field>

    <v-select v-model="idCategory" :rules="[rules.required]" :items="options.category" item-title="description" item-value="id"
      label="Select Category"></v-select>
    <v-select v-model="brandId" :rules="[rules.required]" :items="options.brand" item-title="description" item-value="id"
      label="Select Brand"></v-select>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="cancel()">
      Cancel
    </v-btn>

  </form>
</template>
