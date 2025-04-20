<template>
  <v-card class="mt-4 pa-4" color="grey-lighten-4">
    <h3 class="text-subtitle-1 mb-2">chatGPTの回答</h3>
    <p>{{ answer }}</p>
  </v-card>
</template>

<script setup>
defineProps({ answer: String })
</script>
