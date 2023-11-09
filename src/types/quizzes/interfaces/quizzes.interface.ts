import {
  CommonEntityFields,
  UserResponse,
  Answer,
  Category,
  Question,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

export interface QuestionWithAnswers {
  question: string
  answers: Answer[]
}

export interface Quiz extends CommonEntityFields {
  title: string
  description: string
  items: QuestionWithAnswers[]
  author: Pick<UserResponse, '_id'>
  category: Category | null
  resourceType?: ResourcesTypes
}

export interface CreateQuizParams {
  title: string
  description: string
  items: Question[]
}
