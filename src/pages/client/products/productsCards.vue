<template>
  <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Find a product

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>
  <v-container>
    <v-row dense>
      <!-- Iterar sobre los productos -->
      <v-col
        v-for="(item, index) in filteredItems"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          elevation="3"
        >
          <!-- Imagen del producto -->
          <v-img
            :src="item.image_url"
            :alt="item.name"
            height="200"
            cover
          ></v-img>

          <!-- Título y subtítulo -->
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ formatCurrency(item.price) }}</v-card-subtitle>
          <v-card-subtitle> Brand:  {{ getBrandDescription(item.brand_id) }}</v-card-subtitle>
          <v-card-subtitle> Category: {{ getCategoryDescription(item.id_category) }}</v-card-subtitle>
          <!-- Estado del stock -->
          <v-card-text>
            <v-chip
              :color="item.stock > 0 ? 'green' : 'red'"
              :text="item.stock > 0 ? 'In stock' : 'Out of stock'"
              size="small"
              label
              class="text-uppercase"
            ></v-chip>
          </v-card-text>

          <!-- Acciones -->
          <v-card-actions>
            <v-btn text @click="openCartDialog(item)">
              <v-icon>ri-shopping-cart-2-line</v-icon> Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <CartDialog :show="cartDialog" 
  @update:show="cartDialog = $event" 
  @confirm="handleAddToCart" 
  title="Confirm quantity of the product"
  :message="'How many do you want?'"/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/product-store';
import { useCartStore } from '@/stores/cart-store';
import { useCategoryStore } from '@/stores/category-store';
import { useBrandStore } from '@/stores/brand-store';
import { formatCurrency } from '@/utils/format';
import { toast } from 'vue3-toastify';
import CartDialog from '@/components/CartDialog.vue';


const brandStore = useBrandStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const items = ref([]);
const selectedItem = ref(null);
const cartDialog = ref(false);
const search = ref('');

onMounted(() => {
  loadProducts(),
  loadCategory(),
  loadBrand()
});

const options = ref({
  brand: [],
  category: []
})

const loadProducts = async () => {
  try {
    await productStore.getProd();
    items.value = productStore.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

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
const getBrandDescription = (brandId) => {
  const brand = options.value.brand.find((b) => b.id === brandId);
  return brand ? brand.description : 'Unknown Brand';
};

const getCategoryDescription = (categoryId) => {
  const category = options.value.category.find((c) => c.id === categoryId);
  return category ? category.description : 'Unknown Category';
};
const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return items.value;
  return items.value.filter((item) => 
    item.name.toLowerCase().includes(query) ||
    formatCurrency(item.price).toLowerCase().includes(query)
  );
});

const openCartDialog = (item) => {
  selectedItem.value = item;
  cartDialog.value = true;
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
</script>
