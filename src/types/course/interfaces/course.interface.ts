import {
  CommonEntityFields,
  Lesson,
  Quiz,
  Attachment,
  CategoryInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum
} from '~/types'

export type CourseResources = Lesson | Quiz | Attachment

export interface Course extends CommonEntityFields {
  title: string
  description: string
  sections?: CourseSection[]
  category: CategoryInterface
  subject: SubjectNameInterface
  proficiencyLevel: ProficiencyLevelEnum[]
}

export interface CourseForm
  extends Omit<
    Course,
    'category' | 'subject' | 'sections' | keyof CommonEntityFields
  > {
  category: string | null
  subject: string | null
  sections: CourseSection[]
}

export interface CourseSection {
  id: number
  title: string
  description: string
  resources: CourseResources[]
}
