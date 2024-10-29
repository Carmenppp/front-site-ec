<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Find a product

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>
    
    <v-divider></v-divider>
    <VCol cols="12" sm="4" md="4" class="d-flex justify-end">
              <v-btn color="primary" :to="{ name: 'products add' }" class="justify-end">
                <VIcon />Agregar producto
              </v-btn>
            </VCol>
           
    <v-data-table v-model:search="search" :items="items" :headers="headers">
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>
      <template v-slot:header.actions>
        <div class="text-end">Acctions</div>
      </template>
      <template v-slot:item.image_url="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="item.image_url" height="64" cover></v-img>
        </v-card>
      </template>

      <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-chip :color="item.stock > 0 ? 'green' : 'red'" :text="item.stock > 0 ? 'In stock' : 'Out of stock'"
            class="text-uppercase" size="small" label></v-chip>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">

        <VBtn variant="text" @click="addToCart(item.id)">
          <v-icon>ri-shopping-cart-2-line</v-icon>
        </VBtn>
        <VBtn variant="text" color="error" @click="openDeleteDialog(item)">
          <v-icon>ri-delete-bin-6-line</v-icon>
        </VBtn>
        <VBtn variant="text" @click="toEdit(item.id)">
          <v-icon>ri-arrow-right-s-line</v-icon>
        </VBtn>
      </template>
    </v-data-table>
  </v-card>
  <DeleteDialog :show="deleteDialog" 
  @update:show="deleteDialog = $event" 
  @confirm="confirmDelete" 
  title="Confirm Deletion"
  :message="'Are you sure you want to delete ' + selectedItem?.name + '?'"
/>
  
</template>

<script setup>
import { useProductStore } from '@/stores/product-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import DeleteDialog from '@/components/DeleteDialog.vue';

const productStore = useProductStore();
const items = ref([]);
const search = ref('');
const deleteDialog = ref(false);
const selectedItem = ref(null);
const router = useRouter()
const headers = ref([
  { title: 'Name', value: 'name' },
  { title: 'Image', value: 'image_url' },
  { title: 'Price', value: 'price' },
  { title: 'Stock', value: 'stock' },
  { title: 'Actions', value: 'actions', align: 'end' },
]);


const openDeleteDialog = (item) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};



onMounted(() => {
 loadProducts()
});
const loadProducts = async() =>{
  try {
    await productStore.getProd();
    items.value = productStore.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
const confirmDelete = async () => {
  if (selectedItem.value) {
    try {
      await productStore.deleteProd(selectedItem.value.id);
      items.value = items.value.filter(item => item.id !== selectedItem.value.id);
      toast.success(`Product ${selectedItem.value.name} deleted successfully!`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      toast.error('Error deleting the product');
    }
  }
};

const addToCart = () => {

}

const toEdit = (id) => {
  router.push({
    name: 'products edit',
    params: { id }
  })
}

</script>
