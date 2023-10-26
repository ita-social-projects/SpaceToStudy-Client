import { CommonEntityFields, Lesson, Quiz, Attachment, Category } from '~/types'

export interface Course extends CommonEntityFields {
  title: string
  description: string
  sections?: Array<CourseSection>
  category: Category | null
}

export interface CourseSection {
  title: string
  description: string
  resources: Array<Lesson | Quiz | Attachment>
}
