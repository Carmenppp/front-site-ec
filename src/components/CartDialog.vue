<!-- src/components/DeleteDialog.vue -->
<template>
    <v-dialog :model-value="show" @update:model-value="updateShow" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="quantity" type="number" label="Quantity" min="1"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <VBtn variant="text" @click="decrement">
          <v-icon>ri-subtract-line</v-icon>
        </VBtn>
            <VBtn variant="text" @click="increment">
          <v-icon>ri-add-line</v-icon>
        </VBtn>
          <v-btn color="green darken-1" text @click="confirm">Confirm</v-btn>
          <v-btn color="red darken-1" text @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineEmits, defineProps } from 'vue';
  import { ref } from 'vue';
  
  let quantity = ref(1)

  const props = defineProps({
    show: Boolean,
    title: String,
    message: String
  });
  
  const emit = defineEmits(['update:show', 'confirm', 'quantity']);
  
  const increment = () => {
   quantity.value++
 }

 const decrement = () => {
   quantity.value--
 }
  const confirm = () => {
    emit('confirm', quantity.value);
    emit('update:show', false);  
  };
  
  const cancel = () => {
    emit('update:show', false);  
  };
  
  const updateShow = (value) => {
    emit('update:show', value);
  };
  </script>
  