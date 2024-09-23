import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mockedLessonDataOriginal = {
  _id: '66b67d84b58ba31be667ee2d',
  author: '6658f73f93885febb491e08b',
  title: 'Exploring Systems of Linear Equations',
  description:
    'Students will learn to solve systems of linear equations using different methods, including graphing, substitution, and elimination.',
  content: '<h4>Lesson Plan:</h4>',
  attachments: [],
  category: '6684175179e5232bce4579ed',
  resourceType: ResourceType.Lesson
}

export const mockAvailabilityForLesson = null

export const mockedQuizDataDuplicate = {
  _id: '66b67e2ab58ba31be667ee4c',
  title: 'Quiz: Basics of Multiplication',
  description:
    'A quiz to test the understanding of basic multiplication concepts.',
  items: ['66b67e02b58ba31be667ee43'],
  author: '6658f73f93885febb491e08b',
  category: '6684175179e5232bce4579ed',
  resourceType: ResourceType.Quiz,
  settings: {
    view: 'Scroll',
    shuffle: false,
    pointValues: false,
    scoredResponses: false,
    correctAnswers: false
  },
  isDuplicate: true
}

export const mockAvailabilityForQuizDataDuplicate = {
  status: 'openFrom',
  date: '2022-05-01T00:00:00.000Z'
}

export const mockedAttachmentDataOriginal = {
  _id: '66b67eafb58ba31be667ee83',
  author: '6658f73f93885febb491e08b',
  fileName: 'Exploring Systems of Linear Equations.png',
  link: '1723236050559-Exploring Systems of Linear Equations.png',
  size: 39340,
  category: '6684175179e5232bce4579ed',
  resourceType: ResourceType.Attachment
}

export const mockAvailabilityOpen = {
  status: 'open',
  date: null
}
