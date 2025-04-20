  <template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" class="mb-6">
          <h1 class="text-h4 font-weight-bold">Nocchi App</h1>
        </v-row>

        <TimerPanel />
        <QuestionPanel @answered="handleAnswer" />
        <AnswerPanel v-if="answer" :answer="answer" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import TimerPanel from '@components/TimerPanel.vue'
import QuestionPanel from '@components/QuestionPanel.vue'
import AnswerPanel from '@components/AnswerPanel.vue'

const answer = ref('')
const handleAnswer = (newAnswer) => {
  answer.value = newAnswer
}
</script>

