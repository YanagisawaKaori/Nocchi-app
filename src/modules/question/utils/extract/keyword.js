// extractKeyword.js
import { extractKeywordWithGPT } from '@/modules/question/utils/extract/withgpt'
import { extractKeywordWithRegexOrLibrary } from '@/modules/question/utils/extract/withregexorlibrary'

export const extractKeyword = async (text) => {
  const local = await extractKeywordWithRegexOrLibrary(text)
  return local || await extractKeywordWithGPT(text)
}
