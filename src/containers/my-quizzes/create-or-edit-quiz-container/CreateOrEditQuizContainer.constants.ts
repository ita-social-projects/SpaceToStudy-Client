import { QuizViewEnum } from '~/types'

export const defaultResponse = {
  _id: '',
  title: '',
  description: '',
  items: [],
  author: { _id: '' },
  category: null,
  settings: {
    view: QuizViewEnum.Scroll,
    pointValues: false,
    scoredResponses: false,
    correctAnswers: false,
    shuffle: false
  },
  createdAt: '',
  updatedAt: ''
}
