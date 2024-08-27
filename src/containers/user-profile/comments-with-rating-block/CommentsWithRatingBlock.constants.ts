import { MockResponseItem } from '~/containers/user-profile/comments-block/CommentBlock'

export interface MockReview extends MockResponseItem {
  _id: string
  comment: string
  rating: number
  author: {
    _id: string
    role: string[]
    firstName: string
    lastName: string
    photo: string
    email: string
    categories: never[]
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

const mockAuthor = {
  _id: '63f905d3237ccffcf95d88da',
  role: ['student'],
  firstName: 'Tart',
  lastName: 'Drilling',
  photo:
    'https://media.npr.org/assets/img/2014/08/07/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s300-c85.webp',
  email: 'tartdrilling@gmail.com',
  categories: [],
  lastLogin: '2023-03-03T21:01:30.973Z',
  createdAt: '2023-02-24T18:45:39.298Z',
  updatedAt: '2023-03-03T21:01:30.975Z',
  __v: 0
}

const tutorMockAuthor = {
  _id: '63f905d3237ccffcf95d88db',
  role: ['tutor'],
  firstName: 'Irene',
  lastName: 'Stone',
  photo: '',
  email: 'irene.stone@gmail.com',
  categories: [],
  lastLogin: '2023-03-03T21:01:30.973Z',
  createdAt: '2023-02-24T18:45:39.298Z',
  updatedAt: '2023-03-03T21:01:30.975Z',
  __v: 0
}

const mockOffer = {
  _id: '640092c8c729d4db9788d9d0',
  price: 15,
  proficiencyLevel: ['Beginner'],
  description: 'test description',
  languages: ['English'],
  authorRole: 'student',
  userId: '63f21d357a3b08831a22b257',
  subject: { _id: '63da8767c9ad4c9a0b0eacd3', name: 'English' },
  category: { _id: '63da8767c9ad4c9a0b0eacd3', name: 'Languages' },
  createdAt: '2023-03-02T12:12:56.598Z',
  updatedAt: '2023-03-02T12:12:56.598Z',
  __v: 0
}

const mockResponseItemBase = {
  author: mockAuthor,
  targetUserId: '63f21d357a3b08831a22b257',
  targetUserRole: 'tutor',
  offer: mockOffer,
  createdAt: '2023-03-02T19:13:04.074Z',
  updatedAt: '2023-03-02T19:13:04.074Z',
  __v: 0
}

export const responseMock: { items: MockReview[] } = {
  count: 5,
  items: [
    {
      ...mockResponseItemBase,
      _id: '6400f540307bdcc5da14aa5b',
      comment: 'great',
      rating: 5
    },
    {
      ...mockResponseItemBase,
      _id: '6400f540307bdcc5da14aa5e',
      comment:
        'i spent a lot of money, but my english only got worse after lesson',
      rating: 3
    },
    {
      ...mockResponseItemBase,
      _id: '6400f540307bdcc5da14aa5c',
      comment: 'great',
      rating: 4
    },
    {
      ...mockResponseItemBase,
      _id: '6400f540307bdcc5da14aa5a',
      comment: 'not great at all, i teached her english at our lesson',
      rating: 1
    },
    {
      ...mockResponseItemBase,
      _id: '6400f540307bdcc5da14aa5x',
      comment: 'prety bad',
      rating: 2
    }
  ]
}

export const responseMockStudents: { items: MockReview[] } = {
  count: 4,
  items: [
    {
      ...mockResponseItemBase,
      author: tutorMockAuthor,
      _id: '6400f540307bdcc5da14aa5z',
      comment:
        'Jane is a great student. I am comfortable to work with her. She is very smart, memorizes new things very fast.',
      rating: 5
    },
    {
      ...mockResponseItemBase,
      author: tutorMockAuthor,
      _id: '6400f540307bdcc5da14aa5y',
      comment:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      rating: 5
    },
    {
      ...mockResponseItemBase,
      author: tutorMockAuthor,
      _id: '6400f540307bdcc5da14aa5x',
      comment: 'Exercitation veniam consequat sunt nostrud amet.',
      rating: 3
    },
    {
      ...mockResponseItemBase,
      author: tutorMockAuthor,
      _id: '6400f540307bdcc5da14aa5x',
      comment:
        'The classes are relaxed and I like that she is responsible for her learning.',
      rating: 4
    }
  ]
}

export const loadingMock = false

export const commentsCount = {
  default: 4,
  increment: 10
}
