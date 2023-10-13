import {
  Category,
  CommonEntityFields,
  CreateOrEditQuizForm,
  QuestionTypesEnum,
  UserResponse
} from '~/types'
export interface Answer {
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  text: string
  answers: Answer[]
  author: Pick<UserResponse, '_id'>
  type: QuestionTypesEnum
  category: Category | null
}

export interface CreateQuestionData extends Omit<QuestionForm, 'answers'> {
  answers: Answer[]
}

export interface QuestionFormAnswer extends Answer {
  id: number
}

export interface QuestionForm
  extends Omit<Question, 'author' | 'category' | keyof CommonEntityFields> {
  openAnswer?: string
  category: string | null
  answers: QuestionFormAnswer[]
}

export interface QuestionModalForm {
  title: CreateOrEditQuizForm['questionTitle']
  category: CreateOrEditQuizForm['questionCategory']
}
