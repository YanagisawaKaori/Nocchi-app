<template>
  <v-app>
    <v-main>
      <v-container class="mb-6">
        <v-row justfy="center" class="mb-6">
          <h1 class="text-h4 font-weight-bold">Nocchi App</h1>
        </v-row>

        <!-- タイマーセクション-->
         <v-card class="mb-6 pa-6" outlined>
          <v-row justify="center">
            <h2 class="text-h6">集中タイマー</h2>
          </v-row>
          <v-row justify="center" class="my-4">
            <v-progress-circular
              :rotate="360"
              :size="120"
              :width="15"
              :value="timreProgress"
              color="primary">
              {{ timerText }}
            </v-progress-circular>
          </v-row>
          <v-row justify="center">
            <v-btn @click="toggleTimer" color="primary">{{ isRunning ? '一時停止' : 'スタート' }}
            </v-btn>
          </v-row>
         </v-card>

         <!--質問セクション -->
         <v-card class="mb-6 pa-6">
          <v-row class="mb-2">
            <h2 class="text-h6">質問して記録する</h2>
          </v-row>
          <v-textarea v-model="question" label="質問を入力" auto-grow outline/>
          <v-btn class="mt-2" color="primary" @click="submitQuestion">送信</v-btn>
         </v-card>

         <!--回答セクション-->
         <v-card v-if="answer" class="pa-6" color="grey-lighten-4">
          <h3 class="text-subtitle-1 mb-2">chatGPTの回答</h3>
          <p>{{ answer }}</p>
         </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const question = ref('')
const answer = ref('')
const isRunning = ref('')
const timreProgress = ref(100)
const timerText = ref('50:00')

const toggleTimer = () => {
  isRunning.value = !isRunning.value
  //あとでsetInterval入れる
}
const submitQuestion = () => {
  if (!question.value.trim()) return
  answer.value = `「${question.value}」に対する回答です（仮）`
  question.value = ''
}
</script>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
