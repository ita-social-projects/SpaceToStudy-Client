import { beforeAll, beforeEach, expect } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import Quiz from '~/pages/quiz/Quiz'
import QuizReview from '~/pages/quiz-review/QuizReview'
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
      .onGet(new RegExp(URLs.quizzes.getById.replace(':id', '')))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.getById.replace(':id', mockQuizId)))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(new RegExp(URLs.finishedQuizzes.getById.replace(':id', '')))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(
        new RegExp(URLs.finishedQuizzes.getById.replace(':id', mockQuizId))
      )
      .reply(200, mockQuiz)
    mockAxiosClient.onPost(URLs.finishedQuizzes.add).reply(204, mockQuiz)
  })

  beforeEach(() => {
    renderWithProviders(<Quiz />, {
      preloadedState: { appMain: { userRole: UserRoleEnum.Student } }
    })
  })

  it('should render quiz page with data only for Student', async () => {
    const questionText = await screen.findByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should update checkbox value', () => {
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveProperty('checked', false)

    fireEvent.click(checkbox)

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should display correct answers after finishing quiz', async () => {
    const finishButton = await screen.findByText('quiz.finish')
    fireEvent.click(finishButton)

    const confirmButton = await screen.findByText('quiz.confirm')
    fireEvent.click(confirmButton)

    const correctAnswers = await screen.findByText(
      'questionPage.questionType.multipleChoice'
    )
    expect(correctAnswers).toBeInTheDocument()
  })

  it('should render question text', async () => {
    const questionText = await screen.findByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should render timer for the active quiz for student', async () => {
    const timer = await screen.findByTestId('TimerOutlinedIcon')
    expect(timer).toBeInTheDocument()
  })
})

describe('Quiz tutor variant for tutor', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.getById.replace(':id', '')))
      .reply(200, mockQuiz)
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.getById.replace(':id', mockQuizId)))
      .reply(200, mockQuiz)
    mockAxiosClient.onPost(URLs.finishedQuizzes.add).reply(204, mockQuiz)
  })

  beforeEach(() => {
    renderWithProviders(<Quiz />, {
      preloadedState: { appMain: { userRole: UserRoleEnum.Tutor } }
    })
  })

  it('should render quiz page with data only for tutor', async () => {
    const points = await screen.findByText('quiz.points')
    expect(points).toBeInTheDocument()
  })
})
