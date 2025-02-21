import { beforeAll, beforeEach, expect } from 'vitest'
import { screen } from '@testing-library/react'
import QuizPreview from '~/pages/quiz-preview/QuizAttempts'
import { ResourcesTypesEnum as ResourceType, UserRoleEnum } from '~/types'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockQuizId = '6641388f36ebdb0432a3a2e5'

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

describe('QuizPage for student', () => {
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
  })

  beforeEach(() => {
    renderWithProviders(<QuizPreview />, {
      appMain: { userRole: UserRoleEnum.Student }
    })
  })

  it('should render quiz preview page with data', async () => {
    const quizTitle = await screen.findByText('JS Quiz')
    expect(quizTitle).toBeInTheDocument()
  })
})
