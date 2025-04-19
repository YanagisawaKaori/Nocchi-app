import { getModel } from '@/utils/model'
import { KANI_SYSTEM_PROMPT } from '@/utils/prompts'

export const fetchChatCompletion = async (userContent, options = {}) => {
  const {
    modelType = 'light',
    systemPrompt = '',
    temperature = 0.7,
    max_tokens = 1000,
  } = options

  const messages = systemPrompt
    ? [{ role: 'system', content: systemPrompt }, { role: 'user', content: userContent }]
    : [{ role: 'user', content: userContent }]

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: getModel(modelType),
        messages,
        temperature,
        max_tokens,
      }),
    })

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '回答が取得できませんでした'
  } catch (error) {
    console.error('[ChatGPT API Error]', error)
    return 'エラーが発生しました'
  }
}
