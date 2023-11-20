import { Attachment } from '~/types'

export interface LessonData {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: string | null
}
