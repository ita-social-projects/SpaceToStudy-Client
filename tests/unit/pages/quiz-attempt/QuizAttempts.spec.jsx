import { beforeAll, beforeEach, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import QuizAttemptsPage from '~/pages/quiz-attempts/QuizAttempts'
import { ResourcesTypesEnum as ResourceType, UserRoleEnum } from '~/types'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockQuizId = '6641388f36ebdb0432a3a2e5'
const mockCooperationId = '67ba3b3e4ab9fe9998c7ca2b'

const mockQuiz = {
  _id: mockQuizId,
  title: 'JS Quiz',
  items: [
    {
      _id: '665e1f1a9946b3dbb292339f',
      title: 'Functions?',
      text: 'What is the difference between function expression and function declaration?',
      answers: [{ isCorrect: true, text: 'Correct answer' }],
      type: 'multipleChoice'
    }
  ],
  author: '660a8c7da2f78d2ed869b2bf',
  category: '665799d795ab9dbdd7ad40df',
  resourceType: ResourceType.Quiz,
  settings: {
    view: 'Stepper',
    shuffle: false,
    pointValues: true,
    scoredResponses: true,
    correctAnswers: true,
    attemptLimit: '2 attempts',
    timeLimit: '15 minutes'
  },
  createdAt: '2024-05-12T21:45:51.693Z',
  updatedAt: '2024-06-07T07:05:33.052Z',
  availability: {
    status: 'open',
    date: null
  },
  description: 'Js'
}

const mockFinishedQuizzes = [
  {
    _id: '67ba3be14ab9fe9998c7cacb',
    quiz: '67ba3bb14ab9fe9998c7ca7d',
    cooperation: mockCooperationId,
    grade: 100,
    results: [
      {
        question: 'Question 1',
        answers: [
          {
            text: 'Correct',
            isCorrect: true,
            isChosen: true
          },
          {
            text: 'Wrong',
            isCorrect: false,
            isChosen: false
          }
        ]
      }
    ],
    createdAt: '2025-02-22T21:04:33.651Z',
    updatedAt: '2025-02-22T21:04:33.651Z'
  }
]

const mockUseParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useParams: () => mockUseParams()
  }
})

describe('QuizPage for student', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({
      id: mockCooperationId,
      quizId: mockQuizId
    })
  })

  beforeAll(() => {
    mockAxiosClient
      .onGet(URLs.quizzes.getById.replace(':id', ''))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.getById.replace(':id', mockQuizId)))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(URLs.finishedQuizzes.getById.replace(':id', ''))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(
        new RegExp(URLs.finishedQuizzes.getById.replace(':id', mockQuizId))
      )
      .reply(200, mockQuiz)

    mockAxiosClient
      .onGet(
        URLs.finishedQuizzes.getByQuizId
          .replace(':cooperationId', mockCooperationId)
          .replace(':quizId', mockQuizId)
      )
      .reply(200, mockFinishedQuizzes)
  })

  beforeEach(() => {
    renderWithProviders(<QuizAttemptsPage />, {
      appMain: { userRole: UserRoleEnum.Student }
    })
  })

  it('should render quiz preview page with data', async () => {
    const quizTitle = await screen.findByText('JS Quiz')
    expect(quizTitle).toBeInTheDocument()
  })

  it('should render Quiz review after review button is clicked', async () => {
    const reviewButton = await screen.findByText('quiz.reviewAttempt')

    fireEvent.click(reviewButton)

    const quizTitle = await screen.findByText('JS Quiz')
    expect(quizTitle).toBeInTheDocument()
  })
})
