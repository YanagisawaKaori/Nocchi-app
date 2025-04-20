// 正規表現だけでキーワード抽出する軽量バージョン
export const extractKeywordWithRegexOrLibrary = async (text) => {
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

  // kuromojiが使えない環境のため、ローカル抽出失敗時は null返却
  return null
}
