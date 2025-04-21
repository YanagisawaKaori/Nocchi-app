<template>
  <v-card class="mb-6 pa-6">
    <v-row class="mb-2">
      <h2 class="text-h6">質問して記録する</h2>
    </v-row>
    <v-textarea v-model="question" label="質問を入力" auto-grow outlined />
    <v-btn class="mt-2" color="primary" :loading="loading" @click="submit">送信</v-btn>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useSubmitQuestion } from '@/modules/question/composable/useSubmitQuestion'
const question = ref('')
const loading = ref(false)
const emit = defineEmits(['answered'])

const submit = async () => {
  if (!question.value.trim()) return
  loading.value = true
  const { shortAnswer } = await useSubmitQuestion(question.value)
  emit('answered', shortAnswer)
  question.value = ''
  loading.value = false
}
</script>
