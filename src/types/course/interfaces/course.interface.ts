import {
  CommonEntityFields,
  Lesson,
  Quiz,
  Attachment,
  CategoryInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum,
  UserResponse
} from '~/types'

export type CourseResources = Lesson | Quiz | Attachment
export interface Course extends CommonEntityFields {
  title: string
  description: string
  author: Pick<UserResponse, '_id'>
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
  lessons: string[]
  quizzes: string[]
  attachments: string[]
}

export interface GetCoursesResponse {
  items: Course[]
  count: number
}

export type MyCorsesListProps = Omit<GetCoursesResponse, 'count'>
