import type { Attachment, Category } from '~/types'

export interface LessonData {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: Category | string | null
  isDuplicate?: boolean
}
