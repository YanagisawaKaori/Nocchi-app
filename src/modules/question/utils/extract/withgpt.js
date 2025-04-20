
export const extractKeywordWithGPT = async (text, { modelType = 'light' } = {}) => {
  const messages = [
    {
      role: 'system',
      content: 'あなたは日本語の質問文から中心となる単語（キーワード）を抽出するAIです。回答は必ず1語にしてください。余計な説明は不要です。'
    },
    {
      role: 'user',
      content: `${text} → この質問の中心キーワードを1語で答えてください。`
    }
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: modelType === 'light' ? 'gpt-3.5-turbo' : 'gpt-4',
      messages,
      temperature: 0.2
    })
  })

  const data = await res.json()
  const answer = data.choices?.[0]?.message?.content?.trim()

  return answer || text // 念のため fallback で元文返す
}
