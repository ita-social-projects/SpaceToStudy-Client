import {
  RequestParams,
  CommonEntityFields,
  UserResponse,
  Answer
} from '~/types'

export interface QuizzesParams extends RequestParams {
  title: string
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
