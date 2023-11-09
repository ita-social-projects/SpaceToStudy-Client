import {
  CommonEntityFields,
  UserResponse,
  Answer,
  Category,
  Question
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

export interface QuizViewProps {
  questions: Question[]
}

export interface QuizQuestionProps {
  question: Question
  index: number
}
