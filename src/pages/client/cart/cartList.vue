<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Your cart

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table v-model:search="search" :items="items" :headers="headers">

      <template v-slot:header.actions>
        <div class="text-end">Acctions</div>
      </template>

      <template v-slot:item.price="{ item }">
        <div>{{ formatCurrency(item.price) }}</div>
      </template>
      <template v-slot:item.created_at="{ item }">
        <div>{{ dayjs(item.created_at).format('DD/MM/YYYY') }} ({{ item.daysInCart }} days ago)</div>
      </template>
      <template v-slot:item.warranty="{ item }">
        <div v-if="item.warrantyDaysLeft > 0">
          {{ item.warrantyDaysLeft }} days remaining
        </div>
        <div v-else>
          Expired
        </div>
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
    <v-chip prepend-icon="$vuetify" variant="outlined">
      Total estimado a pagar: {{ formatCurrency(totals) }}
    </v-chip>
  </v-card>
  <DeleteDialog :show="deleteDialog" @update:show="deleteDialog = $event" @confirm="confirmDelete"
    title="Confirm Deletion" :message="'Are you sure you want to delete ' + selectedItem?.name + '?'" />

</template>

<script setup>
import { useCartStore } from '@/stores/cart-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import DeleteDialog from '@/components/DeleteDialog.vue';

const cartStore = useCartStore();
const items = ref([]);
const search = ref('');
let totals = ref(0)
const deleteDialog = ref(false);
const selectedItem = ref(null);
const router = useRouter()
const headers = ref([
  { title: 'Product', value: 'name' },
  { title: 'Price', value: 'price' },
  { title: 'Quantity', value: 'quantity' },
  { title: 'Date added', value: 'created_at' },
  { title: 'Warranty', value: 'warranty' },
  { title: 'Actions', value: 'actions', align: 'end' },
]);

const WARRANTY_PERIOD_DAYS = 365;

const openDeleteDialog = (item) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

onMounted(() => {
  loadCart(),
  totalCalc()
});

const totalCalc = async () => {
  await cartStore.getCartById();
  const cartItems = cartStore.cart
  let calc = 0
  for (let i = 0; i < cartItems.length; i++) {
    calc = calc + Number(cartItems[i].price) * Number(cartItems[i].quantity);
  }
  totals.value = calc;
}
const dateDiff = (item) => {
  const dateCreated = dayjs(item.created_at);
  const today = dayjs();
  item.daysInCart = today.diff(dateCreated, 'days');
  item.warrantyDaysLeft = WARRANTY_PERIOD_DAYS - item.daysInCart;
  return item;
};


const loadCart = async () => {
  try {
    await cartStore.getCartById();
    items.value = cartStore.cart.map(dateDiff);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


const confirmDelete = async () => {
  if (selectedItem.value) {
    try {
      await cartStore.deleteCart(selectedItem.value.id);
      items.value = items.value.filter(item => item.id !== selectedItem.value.id);
      toast.success(`Product ${selectedItem.value.name} deleted successfully!`);
      totalCalc()
    } catch (error) {
      console.error('Error eliminando producto:', error);
      toast.error('Error deleting the product');
    }
  }
};


const toEdit = (id) => {
  router.push({
    name: 'products edit',
    params: { id }
  })
}

</script>