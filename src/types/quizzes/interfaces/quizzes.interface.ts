import {
  CommonEntityFields,
  UserResponse,
  Question,
  ResourcesTabsEnum as ResourcesTypes,
  QuizViewEnum
} from '~/types'

export interface QuizSettings {
  view: QuizViewEnum
  pointValues: boolean
  scoredResponses: boolean
  correctAnswers: boolean
  shuffle: boolean
}

export interface Quiz extends CommonEntityFields {
  title: string
  description: string
  items: Question[]
  author: Pick<UserResponse, '_id'>
  category: string | null
  resourceType?: ResourcesTypes
  settings: QuizSettings
}

export type CreateQuizParams = Omit<
  Quiz,
  'author' | '_id' | 'createdAt' | 'updatedAt' | 'settings'
> & {
  settings?: QuizSettings
}

export interface UpdateQuizParams
  extends Partial<Omit<Quiz, 'author' | '_id' | 'createdAt' | 'updatedAt'>> {
  id: string
}
