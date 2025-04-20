<script setup>
import { ref } from 'vue'
import { getModel } from '@/utils/model'
import { saveToNotion } from './utils/notion'
import { saveStructuredToNotion } from './utils/notion'
import { structuredPrompt } from './utils/prompt'



const question = ref('')
const answer = ref('')
const isRunning = ref(false)
const timerProgress = ref(100)
const timerText = ref('50:00')
const loading = ref(false)

const toggleTimer = () => {
  isRunning.value = !isRunning.value
}

const submitQuestion = async () => {
  if (!question.value.trim()) return

  loading.value = true
  try {
    // 1. 通常回答（短く端的）
    const shortRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: getModel('full'),
        messages: [{ role: 'user', content: question.value }],
        temperature: 0.7
      })
    })

    const shortData = await shortRes.json()
    const shortAnswer = shortData.choices?.[0]?.message?.content
    answer.value = shortAnswer

    // 2. ページ先に作成（構造用プロパティ含む）
    const prompt = structuredPrompt(question.value)
    const longRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: getModel('full'),
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5
      })
    })

    const longData = await longRes.json()
    const structuredJSON = JSON.parse(longData.choices?.[0]?.message?.content)

    // 3. Notionに構造回答でプロパティ登録＋本文ブロックで通常回答追記
    await saveStructuredToNotion(question.value, structuredJSON, shortAnswer)

  } catch (e) {
    answer.value = 'エラーが発生しました。'
    console.error(e)
  } finally {
    loading.value = false
    question.value = ''
  }
}

import { structuredPrompt } from './utils/prompt'

// フォームの v-model を question にしたままでOK
const submitStructuredQuestion = async () => {
  if (!question.value.trim()) return

  loading.value = true
  try {
    const prompt = structuredPrompt(question.value)

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5
      })
    })

    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content

    const parsed = JSON.parse(raw)

    // Notionに保存（タグ除外）
    await saveStructuredToNotion(question.value, parsed)

    answer.value = 'Notionに保存しました'

  } catch (e) {
    answer.value = 'エラーが発生しました'
    console.error(e)
  } finally {
    loading.value = false
    question.value = ''
  }
}



</script>
