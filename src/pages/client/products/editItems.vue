<script setup>
import { onMounted, ref } from 'vue';
import { rules } from '@/utils/rules';
import { useProductStore } from '@/stores/product-store';
import { useBrandStore } from '@/stores/brand-store';
import { useCategoryStore } from '@/stores/category-store';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const productStore = useProductStore();
const brandStore = useBrandStore();
const categoryStore = useCategoryStore();

const id = useRoute().params.id
const router = useRouter()
onMounted(async() => {
  await loadBrand();
  await loadCategory();
  await loadProduct();
})
const form = ref({
  name: '',
 description: '',
 price: 0,
 stock: 0,
 imageUrl: '',
 idCategory: null,
 brandId: null
})

const options = ref({
  brand: [],
  category: []
})

const productForm = ref()

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

const loadProduct = async () =>{
  try {
    if (!id) return cancel();
    await productStore.getProdById(Number(id));
    const res = productStore.products
    if (res) {
      form.value = {
        name: res.name,
        description: res.description,
        price: res.price,
        stock: res.stock,
        imageUrl: res.image_url,
        idCategory: res.id_category,
        brandId: res.brand_id
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const updateProd = async () => {
  try {
    const productData = {
    name: form.value.name,
    description: form.value.description,
    price: form.value.price,
    stock: form.value.stock,
    imageUrl: form.value.imageUrl,
    idCategory: form.value.idCategory,
    brandId: form.value.brandId
  };
  await productStore.editProd(id, productData)
  toast.success("Producto actualizado con exito")
  setTimeout(() => {
      cancel();
    }, 1500);
  } catch (error) {
    console.log(error)
    toast.error("Error al actualizar producto")
  }
  
}

const cancel = () => {
  router.push({ name: 'products'})
}

</script>


<template>
   <h3>Editar Producto</h3>
   <v-divider class="mt-5 mb-5"></v-divider>
  <form @submit.prevent="updateProd" ref="productForm">
    <v-text-field v-model="form.name" :rules="[rules.required]" label="Name"></v-text-field>

    <v-text-field v-model="form.description" :rules="[rules.required]" label="Description"></v-text-field>

    <v-text-field v-model="form.price" :rules="[rules.required]" label="price"></v-text-field>

    <v-text-field v-model="form.stock" :rules="[rules.required]" label="Stock"></v-text-field>
    <v-text-field v-model="form.imageUrl" :rules="[rules.required]" label="Image Url"></v-text-field>

    <v-select v-model="form.idCategory" :rules="[rules.required]" :items="options.category" item-title="description" item-value="id"
      label="Select Category"></v-select>
    <v-select v-model="form.brandId" :rules="[rules.required]" :items="options.brand" item-title="description" item-value="id"
      label="Select Brand"></v-select>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="cancel()">
      Cancel
    </v-btn>

  </form>

</template>
