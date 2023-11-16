import {
  CommonEntityFields,
  Lesson,
  Quiz,
  Attachment,
  CategoryInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum
} from '~/types'

export interface Course extends CommonEntityFields {
  title: string
  description: string
  sections?: CourseSection[]
  category: CategoryInterface
  subject: SubjectNameInterface
  proficiencyLevel: ProficiencyLevelEnum[]
}

export interface CourseSection {
  id: number
  title: string
  description: string
  resources: (Lesson | Quiz | Attachment)[]
}
