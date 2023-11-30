import {
  Category,
  CategoryNameInterface,
  CommonEntityFields,
  QuestionTypesEnum
} from '~/types'
export interface Answer {
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  text: string
  answers: Answer[]
  author: string
  type: QuestionTypesEnum
  category: Category | null
}

export interface GetQuestion extends Omit<Question, 'category'> {
  category: string | null
}

export interface CreateQuestionData extends Omit<QuestionForm, 'answers'> {
  answers: Answer[]
}

export interface UpdateQuestionParams {
  title: Question['title']
  id: Question['_id']
  text: Question['text']
  category: CategoryNameInterface | string | null
  type: Question['type']
  answers: Question['answers']
}

export interface QuestionFormAnswer extends Answer {
  id: number
}

export interface QuestionForm
  extends Omit<Question, 'author' | 'category' | keyof CommonEntityFields> {
  openAnswer?: string
  category: string | CategoryNameInterface | null
  answers: QuestionFormAnswer[]
}

export interface CreateOrEditQuestionForm
  extends Omit<QuestionForm, 'category'> {
  category: string | null
}

export interface QuestionModalForm {
  title: Question['title']
  category: UpdateQuestionParams['category']
}
