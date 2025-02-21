import { type FinishedQuiz } from '~/types/finished-quizzes/types/finishedQuizzes.types'
import {
  CommonEntityFields,
  UserResponse,
  Question,
  QuizViewEnum,
  ResourceBase,
  Category,
  QuizTimeLimit,
  QuizAttempt
} from '~/types'

export interface QuizSettings {
  view: QuizViewEnum
  pointValues: boolean
  scoredResponses: boolean
  correctAnswers: boolean
  shuffle: boolean
  timeLimit: QuizTimeLimit
  attemptLimit: QuizAttempt
}

export interface Quiz extends CommonEntityFields, ResourceBase {
  title: string
  items: Question[]
  author: Pick<UserResponse, '_id'>
  category: Category | null
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

export type FinishedAttempts = FinishedQuiz[]
