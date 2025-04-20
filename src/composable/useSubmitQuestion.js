// composables/useSubmitQuestion.js
import { saveStructuredToNotion } from '@utils/notion'

const structuredPrompt = (q) => `${q} を構造的にJSON形式で教えてください`

export const useSubmitQuestion = async (question) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  const res1 = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: question }],
      temperature: 0.7
    })
  })
  const shortAnswer = (await res1.json()).choices?.[0]?.message?.content

  const prompt = structuredPrompt(question)
  const res2 = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5
    })
  })
  const structuredJSON = JSON.parse((await res2.json()).choices?.[0]?.message?.content)
  await saveStructuredToNotion(question, structuredJSON, shortAnswer)

  return { shortAnswer, structuredJSON }
}
