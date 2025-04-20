// extractKeyword.js
import { extractKeywordWithGPT } from '@utils/extract/withgpt'
import { extractKeywordWithRegexOrLibrary } from '@utils/extract/withregexorlibrary'

export const extractKeyword = async (text) => {
  const local = await extractKeywordWithRegexOrLibrary(text)
  return local || await extractKeywordWithGPT(text)
}
