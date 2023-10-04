import {
  Category,
  CommonEntityFields,
  QuestionTypesEnum,
  UserResponse
} from '~/types'
export interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  text: string
  answers: Omit<Answer, 'id'>[]
  author: Pick<UserResponse, '_id'>
  type: QuestionTypesEnum
  category: Category
}

export interface CreatedQuestion extends CommonEntityFields {
  answers: Answer[]
  author: string
  category: Category
  title: string
  type: string
}

export interface QuestionCategory {
  name: string
  _id: string
}

export interface QuestionForm
  extends Omit<
    CreatedQuestion,
    'author' | 'category' | keyof CommonEntityFields
  > {
  text?: string
  openAnswer?: string
  category: Category | null
}
