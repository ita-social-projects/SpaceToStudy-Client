import {
  CategoryInterface,
  CommonEntityFields,
  QuestionTypesEnum,
  UserResponse
} from '~/types'
export interface Answer {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  text: string
  answers: Omit<Answer, 'id'>[]
  author: Pick<UserResponse, '_id'>
  type: QuestionTypesEnum
  category: Pick<CategoryInterface, '_id' | 'name'>
}
