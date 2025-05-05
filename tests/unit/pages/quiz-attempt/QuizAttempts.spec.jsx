import { beforeAll, beforeEach, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import QuizAttemptsPage from '~/pages/quiz-attempts/QuizAttempts'
import { ResourcesTypesEnum as ResourceType, UserRoleEnum } from '~/types'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockQuizId = '6641388f36ebdb0432a3a2e5'
const mockCooperationId = '67ba3b3e4ab9fe9998c7ca2b'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 }
    }
  })

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
  availability: { status: 'open', date: null },
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
          { text: 'Correct', isCorrect: true, isChosen: true },
          { text: 'Wrong', isCorrect: false, isChosen: false }
        ]
      }
    ],
    createdAt: '2025-02-22T21:04:33.651Z',
    updatedAt: '2025-02-22T21:04:33.651Z'
  }
]

const mockUseParams = vi.fn()
const mockedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useParams: () => mockUseParams(),
    useNavigate: () => mockedNavigate
  }
})

const queryClient = createTestQueryClient()

const setupMockAxios = (withAttempts = true) => {
  mockAxiosClient
    .onGet(new RegExp(URLs.quizzes.getById.replace(':id', mockQuizId)))
    .reply(200, mockQuiz)

  mockAxiosClient
    .onGet(
      URLs.finishedQuizzes.getByQuizId
        .replace(':cooperationId', mockCooperationId)
        .replace(':quizId', mockQuizId)
    )
    .reply(200, withAttempts ? mockFinishedQuizzes : [])
}

const renderPage = (role) => {
  renderWithProviders(
    <QueryClientProvider client={queryClient}>
      <QuizAttemptsPage />
    </QueryClientProvider>,
    {
      preloadedState: {
        appMain: { userRole: role }
      }
    }
  )
}

describe('QuizAttemptsPage - Student role', () => {
  beforeAll(() => {
    setupMockAxios(true)
  })

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: mockCooperationId, quizId: mockQuizId })
    queryClient.clear()
    renderPage(UserRoleEnum.Student)
  })

  it('renders quiz preview with title', async () => {
    const title = await screen.findByText('JS Quiz')
    expect(title).toBeInTheDocument()
  })

  it('shows review view after clicking "reviewAttempt"', async () => {
    const reviewButton = await screen.findByText('quiz.reviewAttempt')
    fireEvent.click(reviewButton)

    const quizTitle = await screen.findByText('JS Quiz')
    expect(quizTitle).toBeInTheDocument()
  })

  it('opens start modal on click', async () => {
    const startButton = await screen.findByTestId('startButton')
    fireEvent.click(startButton)

    const modalTitle = await screen.findByText('quiz.start')
    expect(modalTitle).toBeInTheDocument()
  })
})

describe('QuizAttemptsPage - Tutor role', () => {
  beforeEach(() => {
    setupMockAxios(true)
    mockUseParams.mockReturnValue({ id: mockCooperationId, quizId: mockQuizId })
    queryClient.clear()
    renderPage(UserRoleEnum.Tutor)
  })

  it('navigates to quiz editor on confirm start', async () => {
    const startButton = await screen.findByTestId('startButton')
    fireEvent.click(startButton)

    expect(mockedNavigate).toHaveBeenCalledWith(
      expect.stringContaining(`/my-resources/edit-quiz/${mockQuizId}`)
    )
  })
})

describe('QuizAttemptsPage - No finished attempts', () => {
  beforeEach(() => {
    setupMockAxios(false)
    mockUseParams.mockReturnValue({ id: mockCooperationId, quizId: mockQuizId })
    queryClient.clear()
    renderPage(UserRoleEnum.Student)
  })

  it('shows message about no attempts', async () => {
    const noAttempts = await screen.findByText('quiz.noUsedAttempts')
    expect(noAttempts).toBeInTheDocument()
  })
})
