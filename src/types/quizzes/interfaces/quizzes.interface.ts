import {
  CommonEntityFields,
  UserResponse,
  Answer,
  QuestionForm,
  Category
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
}

export interface CreateOrEditQuizForm extends QuestionForm {
  description?: string
  items: string[]
  questionTitle: string
  questionCategory: string | null
}
