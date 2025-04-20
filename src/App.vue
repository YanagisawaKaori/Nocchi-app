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
import TimerPanel from '@/modules/timer/components/timerpanel.vue'
import QuestionPanel from '@/modules/question/components/questionpanel.vue'
import AnswerPanel from '@/modules/question/components/answepanel.vue'

const answer = ref('')
const handleAnswer = (newAnswer) => {
  answer.value = newAnswer
}
</script>

