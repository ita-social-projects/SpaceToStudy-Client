import { CommonEntityFields, UserResponse } from '~/types'
export interface Answer {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  items: Omit<Answer, 'id'>[]
  author: Pick<UserResponse, '_id'>
}
export interface QuestionCategory {
  name: string
  _id: string
}
