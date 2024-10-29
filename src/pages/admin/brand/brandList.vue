<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Find a brand

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>
    
    <v-divider></v-divider>
    <VCol cols="12" sm="4" md="4" class="d-flex justify-end">
              <v-btn color="primary" :to="{ name: 'brands add' }" class="justify-end">
                <VIcon />Agregar marca
              </v-btn>
            </VCol>
           
    <v-data-table v-model:search="search" :items="items" :headers="headers">
      
      <template v-slot:header.actions>
        <div class="text-end">Acctions</div>
      </template>

      <template v-slot:item.actions="{ item }">
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
import { useBrandStore } from '@/stores/brand-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import DeleteDialog from '@/components/DeleteDialog.vue';

const brandStore = useBrandStore();
const items = ref([]);
const search = ref('');
const deleteDialog = ref(false);
const selectedItem = ref(null);
const router = useRouter()
const headers = ref([
  { title: 'ID', value: 'id' },
  { title: 'Descripcion', value: 'description' },
  { title: 'Actions', value: 'actions', align: 'end' },
]);


const openDeleteDialog = (item) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};



onMounted(() => {
 loadBrand()
});
const loadBrand = async() =>{
  try {
    await brandStore.getBrand();
    items.value = brandStore.brands;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
const confirmDelete = async () => {
  if (selectedItem.value) {
    try {
      await brandStore.deleteBrand(selectedItem.value.id);
      items.value = items.value.filter(item => item.id !== selectedItem.value.id);
      toast.success(`Brand ${selectedItem.value.description} deleted successfully!`);
    } catch (error) {
      console.error('Error eliminando marca:', error);
      toast.error('Error deleting the brand');
    }
  }
};



const toEdit = (id) => {
  router.push({
    name: 'brands edit',
    params: { id }
  })
}

</script>
