<template>
  <v-card class="mb-6 pa-6" outlined>
    <v-row justify="center">
      <h2 class="text-h6">集中タイマー</h2>
    </v-row>
    <v-row justify="center" class="my-4">
      <v-progress-circular
        :rotate="360"
        :size="120"
        :width="15"
        :value="timerProgress"
        color="primary"
      >
        {{ timerText }}
      </v-progress-circular>
    </v-row>
    <v-row justify="center">
      <v-btn @click="toggleTimer" color="primary">
        {{ isRunning ? '一時停止' : 'スタート' }}
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
const isRunning = ref(false)
const timerProgress = ref(100)
const timerText = ref('50:00')
const toggleTimer = () => {
  isRunning.value = !isRunning.value
}
</script>

