import kuromoji from 'kuromoji'

let tokenizer = null

// kuromoji 初期化（最初だけ）
export const initTokenizer = () =>
  new Promise((resolve, reject) => {
    if (tokenizer) return resolve(tokenizer)
    kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build((err, _tokenizer) => {
      if (err) return reject(err)
      tokenizer = _tokenizer
      resolve(tokenizer)
    })
  })

// 正規表現 or kuromoji でキーワード抽出
export const extractWithRegexOrLibrary = async (text) => {
  const cleaned = text
    .replace(/[\?？]/g, '')
    .replace(/\s+/g, '')

  const patterns = [
    /(.+?)について(教えて|解説して|知りたい)?/,
    /(.+?)って(なに|なにか|なん|なんですか)?/,
    /(.+?)とは(なに|なんですか|なにか)?/,
    /(.+?)の(使い方|構文|意味)/,
    /(.+?)を(教えて|解説して|説明して|せつめいして)/,
    /(.+?)を例で(解説|説明|せつめい)/,
    /(.+?)(使い方|意味)?/
  ]

  for (const pattern of patterns) {
    const match = cleaned.match(pattern)
    if (match) return match[1].trim()
  }

  // fallback：形態素解析（名詞）で最初の重要単語を拾う
  try {
    await initTokenizer()
    const tokens = tokenizer.tokenize(text)
    const nouns = tokens.filter(t => t.pos === '名詞').map(t => t.surface_form)
    return nouns.length ? nouns[0] : null
  } catch (e) {
    console.error('❌ kuromojiエラー:', e)
    return null
  }
}
