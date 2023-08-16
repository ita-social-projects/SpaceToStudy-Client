import { RequestParams, CommonEntityFields, UserResponse } from '~/types'

export interface QuizzesParams extends RequestParams {
  title: string
}

export interface Answer {
  text: string
  isCorrect: boolean
}

export interface QuestionWithAnswers {
  question: string
  answers: Answer[]
}

export interface Quiz extends CommonEntityFields {
  title: string
  items: QuestionWithAnswers[]
  author: Pick<UserResponse, '_id'>
}
