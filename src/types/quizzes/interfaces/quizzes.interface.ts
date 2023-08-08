import { RequestParams, CommonEntityFields } from '~/types'

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

export interface QuizInterface extends CommonEntityFields {
  _id: string
  title: string
  items: QuestionWithAnswers[]
  author: string
}
