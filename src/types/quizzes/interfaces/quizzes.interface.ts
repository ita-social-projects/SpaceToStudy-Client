import {
  CommonEntityFields,
  UserResponse,
  Answer,
  Category,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

export interface QuestionWithAnswers {
  question: string
  answers: Answer[]
}

export interface Quiz extends CommonEntityFields {
  title: string
  items: QuestionWithAnswers[]
  author: Pick<UserResponse, '_id'>
  category: Category | null
  resourceType?: ResourcesTypes
}
