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
      <template v-slot:item.price="{ item }">
        <div>{{ formatCurrency(item.price) }}</div>
      </template>
      <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-chip :color="item.stock > 0 ? 'green' : 'red'" :text="item.stock > 0 ? 'In stock' : 'Out of stock'"
            class="text-uppercase" size="small" label></v-chip>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <VBtn variant="text" @click="openCartDialog(item)">
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
    <v-chip prepend-icon="$vuetify" class="flex-1-0 ma-2 pa-2" variant="outlined">
  Total de productos en stock: {{ totalProduct }}
</v-chip>
<v-chip prepend-icon="$vuetify" class="flex-1-0 ma-2 pa-2" variant="outlined">
  Productos fuera de stock: {{ totalOutOfStock }}
</v-chip>
  </v-card>
  <CartDialog :show="cartDialog" 
  @update:show="cartDialog = $event" 
  @confirm="handleAddToCart" 
  title="Confirm quantity of the product"
  :message="'How many do you want?'"/>
  <DeleteDialog :show="deleteDialog" 
  @update:show="deleteDialog = $event" 
  @confirm="confirmDelete" 
  title="Confirm Deletion"
  :message="'Are you sure you want to delete ' + selectedItem?.name + '?'"
/>
  
</template>

<script setup>
import { useProductStore } from '@/stores/product-store';
import { useCartStore } from '@/stores/cart-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { formatCurrency } from '@/utils/format';
import DeleteDialog from '@/components/DeleteDialog.vue';
import CartDialog from '@/components/CartDialog.vue';


const cartStore = useCartStore()
const productStore = useProductStore();
const totalProduct = ref(0)
const totalOutOfStock = ref(0)
const items = ref([]);
const search = ref('');
const deleteDialog = ref(false);
const selectedItem = ref(null);
const cartDialog = ref(false);
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

const openCartDialog = (item) => {
  selectedItem.value = item;
  cartDialog.value = true;
};
onMounted(() => {
 loadProducts(),
 totalCalc()
});

const totalCalc = async () => {
  await productStore.getProd();
  const prodItems = productStore.products
  let calc = 0
  let outStock = 0
  for (let i = 0; i < prodItems.length; i++) {
    const stock = Number(prodItems[i].stock);

    if(stock > 0){
       calc = calc + 1
    } else if (stock <= 0){
      outStock=+ 1
    }
  }
  totalProduct.value = calc;
  totalOutOfStock.value = outStock;
}


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

const handleAddToCart = (quantity) => {
  if (selectedItem.value) {
    const id = selectedItem.value.id
    addToCart(id, quantity);
  }
};
const addToCart = async (id, quantity) => {
try {
  const cartData = {
    productId: id,
    quantity
  };
  await cartStore.createCart(cartData)
  toast.success("Producto agregado al carrito con exito")
  setTimeout(() => {
    }, 1500);
} catch (error) {
  console.log(error)
}
}

const toEdit = (id) => {
  router.push({
    name: 'products edit',
    params: { id }
  })
}

</script>
