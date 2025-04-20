import { Client } from '@notionhq/client'
import { extractKeyword } from '@utils/extract/keyword'


const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY
})

export const saveStructuredToNotion = async (question, parsed, shortAnswer) => {
  const keyword = await extractKeyword(question)

  const createdPage = await notion.pages.create({
    parent: {
      database_id: import.meta.env.VITE_NOTION_DATABASE_ID
    },
    properties: {
      名前: {
        title: [{ text: { content: keyword } }]
      },
      概要: { rich_text: [] },
      '定義・構造': { rich_text: [{ text: { content: parsed['定義・構造'] || '' } }] },
      '図解・フロー': { rich_text: [{ text: { content: parsed['図解・フロー'] || '' } }] },
      '実務での使われ方': { rich_text: [{ text: { content: parsed['実務での使われ方'] || '' } }] },
      '使える形に落とし込む': { rich_text: [{ text: { content: parsed['使える形に落とし込む'] || '' } }] },
      '参照元': parsed['参照元']
        ? { url: parsed['参照元'] }
        : undefined,
      カテゴリ: parsed['カテゴリ']
        ? { select: { name: parsed['カテゴリ'] } }
        : undefined,
      '疑問・未解決メモ': { rich_text: [] }
    }
  })

  await notion.blocks.children.append({
    block_id: createdPage.id,
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ text: { content: shortAnswer } }]
        }
      }
    ]
  })

  console.log('✅ Notion構造＋本文保存完了')

  return createdPage.id
}
