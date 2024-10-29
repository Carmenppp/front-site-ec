<!-- src/components/DeleteDialog.vue -->
<template>
  <v-dialog :model-value="show" @update:model-value="updateShow" max-width="400">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="confirm">Confirm</v-btn>
        <v-btn color="red darken-1" text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  show: Boolean,
  title: String,
  message: String
});

const emit = defineEmits(['update:show', 'confirm']);

const confirm = () => {
  emit('confirm');
  emit('update:show', false);  // Cierra el diálogo
};

const cancel = () => {
  emit('update:show', false);  // Cierra el diálogo
};

const updateShow = (value) => {
  emit('update:show', value);
};
</script>
