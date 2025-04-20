// extractKeyword.js
import { extractWithRegexOrLibrary } from './extractWithRegexOrLibrary'
import { extractKeywordWithGPT } from './extractKeywordWithGPT'

export const extractKeyword = async (text) => {
  const local = await extractWithRegexOrLibrary(text)
  return local || await extractKeywordWithGPT(text)
}


