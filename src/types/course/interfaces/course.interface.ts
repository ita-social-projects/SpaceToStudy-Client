import { CommonEntityFields, Lesson, Quiz, Attachment, Category } from '~/types'

export interface Course extends CommonEntityFields {
  title: string
  description: string
  sections?: CourseSection[]
  category: Category | null
}

export interface CourseSection {
  id: number
  title: string
  description: string
  resources: (Lesson | Quiz | Attachment)[]
}
