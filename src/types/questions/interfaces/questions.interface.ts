import { Category,
  CategoryInterface,
  CommonEntityFields,
  QuestionTypesEnum,
  UserResponse
} from '~/types'
export interface Answer {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question extends CommonEntityFields {
  title: string
  text: string
  answers: Omit<Answer, 'id'>[]
  author: Pick<UserResponse, '_id'>
  type: QuestionTypesEnum
  category: Pick<CategoryInterface, '_id' | 'name'>
}

export interface CreatedQuestion extends CommonEntityFields {
  answers: Answer[]
  author: string
  category: Category
  title: string
  type: string
}

export interface QuestionToCreate {
  title: string
  answers: Answer[]
  category: Category
  type: string
}

export interface QuestionCategory {
  name: string
  _id: string
}
