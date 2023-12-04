import { QuestionTypesEnum } from '~/types'

export const initialValues = {
  category: null,
  answers: [],
  openAnswer: '',
  title: '',
  text: '',
  type: QuestionTypesEnum.MultipleChoice
}

export const defaultResponse = {
  category: null,
  answers: [],
  openAnswer: '',
  title: '',
  text: '',
  type: QuestionTypesEnum.MultipleChoice,
  author: '',
  _id: '',
  createdAt: '',
  updatedAt: ''
}
