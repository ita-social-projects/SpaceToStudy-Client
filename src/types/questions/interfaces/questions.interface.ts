import { CommonEntityFields, UserResponse } from '~/types'
export interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  items: Omit<Answer, 'id'>[]
  author: Pick<UserResponse, '_id'>
}
