import {
  Quiz,
  QuizAttempt,
  QuizTimeLimit,
  QuizViewEnum as QuizView,
  ResourcesTypesEnum as ResourceType
} from '~/types'

export const defaultQuizResponse: Quiz = {
  _id: '',
  title: '',
  description: '',
  items: [],
  author: { _id: '' },
  category: null,
  resourceType: ResourceType.Quiz,
  isDuplicate: false,
  settings: {
    view: QuizView.Scroll,
    shuffle: false,
    pointValues: false,
    scoredResponses: false,
    correctAnswers: false,
    timeLimit: QuizTimeLimit.NoLimit,
    attemptLimit: QuizAttempt.NoLimit
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
