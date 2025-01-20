import {
  QuizTimeLimit,
  QuizViewEnum,
  ResourcesTypesEnum as ResourceType
} from '~/types'

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
    shuffle: false,
    timeLimit: QuizTimeLimit.Minute15
  },
  resourceType: ResourceType.Quiz,
  createdAt: '',
  updatedAt: ''
}
