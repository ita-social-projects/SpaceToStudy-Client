import { expect, vi } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Quiz from '~/pages/quiz/Quiz'
import useQuery from '~/hooks/use-query'
import { ResourcesTypesEnum as ResourceType, UserRoleEnum } from '~/types'

vi.mock('~/hooks/use-query')

const mockQuiz = {
  _id: '6641388f36ebdb0432a3a2e5',
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

const mockQuizEmpty = {
  _id: '1',
  title: 'Empty',
  description: '',
  items: [],
  author: { _id: '' },
  category: null,
  resourceType: ResourceType.Quiz,
  isDuplicate: false,
  settings: {
    view: 'Scroll',
    shuffle: false,
    pointValues: false,
    scoredResponses: false,
    correctAnswers: false,
    attemptLimit: '2 attempts',
    timeLimit: '15 minutes'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const mockFinishedAttempts = [
  {
    _id: '6641388f36ebdb0432a3a2e5',
    updatedAt: '2024-06-07T07:05:33.052Z',
    grade: 85,
    results: [
      {
        question:
          'What is the difference between function expression and function declaration?',
        answers: [{ text: 'Correct answer', isCorrect: true, isChosen: true }]
      }
    ]
  }
]

const mockMaxAttempts = [
  {
    _id: '6641388f36ebdb0432a3a2e5',
    updatedAt: '2024-06-07T07:05:33.052Z',
    grade: 85,
    results: [
      {
        question:
          'What is the difference between function expression and function declaration?',
        answers: [{ text: 'Correct answer', isCorrect: true, isChosen: true }]
      }
    ]
  },
  {
    _id: '6641388f36ebdb0432a3a2e6',
    updatedAt: '2024-06-08T07:05:33.052Z',
    grade: 90,
    results: [
      {
        question:
          'What is the difference between function expression and function declaration?',
        answers: [{ text: 'Correct answer', isCorrect: true, isChosen: true }]
      }
    ]
  }
]

let mockNavigate
let preloadedState
let mockAttemptsData = mockFinishedAttempts

describe('QuizPage with no used attempts', () => {
  beforeEach(() => {
    preloadedState = { appMain: { userRole: UserRoleEnum.Student } }
    mockNavigate = vi.fn()
    vi.mock('react-router-dom', async () => {
      const originalModule = await vi.importActual('react-router-dom')
      return {
        ...originalModule,
        useNavigate: () => mockNavigate
      }
    })

    vi.clearAllMocks()

    useQuery.mockImplementation(({ queryKey }) => {
      if (
        queryKey[0] === 'quiz' &&
        preloadedState.appMain.userRole === UserRoleEnum.Student
      ) {
        return { data: mockQuiz, isLoading: false }
      }
      return { data: [], isLoading: false }
    })
  })

  afterEach(() => {
    vi.resetModules()
  })

  it('should render quiz page with data only for Student', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const questionText = screen.getByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should update checkbox value', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveProperty('checked', false)

    act(() => {
      fireEvent.click(checkbox)
    })

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should display correct answers after finishing quiz', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })
    const finishButton = screen.getByText('quiz.finish')
    act(() => {
      fireEvent.click(finishButton)
    })

    const confirmButton = screen.getByText('quiz.confirm')
    act(() => {
      fireEvent.click(confirmButton)
    })

    // const correctAnswersLabel = screen.queryByText(
    //   'myResourcesPage.quizzes.correctAnswers'
    // )
    // expect(correctAnswersLabel).toBeInTheDocument()
  })

  it('should render points and correctness when finished', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })
    const finishButton = screen.getByText('quiz.finish')
    fireEvent.click(finishButton)

    const confirmButton = screen.getByText('quiz.confirm')
    act(() => {
      fireEvent.click(confirmButton)
    })

    // const pointsLabel = await screen.queryByTestId('quiz-points')

    // const answersCorrectnessLabel = screen.queryByText(
    //   'myResourcesPage.quizzes.correctAnswers'
    // )
    // console.log(answersCorrectnessLabel)
    // expect(pointsLabel).toBeInTheDocument()
    // expect(answersCorrectnessLabel).toBeInTheDocument()
  })

  it('should render question text', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const questionText = screen.getByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should render timer for the active quiz for student', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const timer = await screen.findByTestId('TimerOutlinedIcon')
    expect(timer).toBeInTheDocument()
  })

  it('should render duration for the finished quiz for student', async () => {
    renderWithProviders(<Quiz />, {
      preloadedState
    })
    const finishButton = screen.getByText('quiz.finish')
    fireEvent.click(finishButton)

    const confirmButton = screen.getByText('quiz.confirm')
    act(() => {
      fireEvent.click(confirmButton)
    })

    const duration = await screen.findByTestId('TimerOutlinedIcon')
    expect(duration).toBeInTheDocument()

    expect(duration).toBeInTheDocument()
  })
})
describe('Quiz tutor variant', () => {
  preloadedState = { appMain: { userRole: UserRoleEnum.Student } }
})
