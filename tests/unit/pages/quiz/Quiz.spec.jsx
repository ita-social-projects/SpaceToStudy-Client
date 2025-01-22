import { vi } from 'vitest'
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
    correctAnswers: true
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
    correctAnswers: false
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

let mockNavigate

beforeEach(() => {
  mockNavigate = vi.fn()
  vi.mock('react-router-dom', async () => {
    const originalModule = await vi.importActual('react-router-dom')
    return {
      ...originalModule,
      useNavigate: () => mockNavigate
    }
  })

  vi.clearAllMocks()
})

afterEach(() => {
  vi.resetModules()
})

describe('QuizPage with useQuery', () => {
  it('should render loading state', () => {
    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: true
    })

    renderWithProviders(<Quiz />)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should render quiz page with data', () => {
    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />)

    const quizTitle = screen.getByText('JS Quiz')
    expect(quizTitle).toBeInTheDocument()

    const questionText = screen.getByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should render empty state for empty data', () => {
    useQuery.mockReturnValue({
      data: mockQuizEmpty,
      isLoading: false
    })

    renderWithProviders(<Quiz />)

    const emptyTitle = screen.getByText('Empty')
    expect(emptyTitle).toBeInTheDocument()
  })

  it('should update checkbox value', () => {
    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveProperty('checked', false)

    act(() => {
      fireEvent.click(checkbox)
    })

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should display correct answers after finishing quiz', () => {
    const preloadedState = { appMain: { userRole: UserRoleEnum.Student } }

    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const finishButton = screen.getByText('quiz.finish')
    act(() => {
      fireEvent.click(finishButton)
    })

    const correctAnswersLabel = screen.getByText(
      'myResourcesPage.quizzes.correctAnswers'
    )
    expect(correctAnswersLabel).toBeInTheDocument()
  })

  it('should render points and correctness when finished', () => {
    const preloadedState = { appMain: { userRole: UserRoleEnum.Student } }

    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const finishButton = screen.getByText('quiz.finish')
    fireEvent.click(finishButton)

    const pointsLabel = screen.getByText((_, element) => {
      return (
        element?.textContent?.includes('quiz.points') &&
        element.tagName.toLowerCase() === 'p'
      )
    })

    const answersCorrectnessLabel = screen.getByText(
      'myResourcesPage.quizzes.correctAnswers'
    )

    expect(pointsLabel).toBeInTheDocument()
    expect(answersCorrectnessLabel).toBeInTheDocument()
  })

  it('should render question text', () => {
    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />)

    const questionText = screen.getByText(
      'What is the difference between function expression and function declaration?'
    )
    expect(questionText).toBeInTheDocument()
  })

  it('should render timer for the active quiz for student', () => {
    const preloadedState = { appMain: { userRole: UserRoleEnum.Student } }

    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const timer = screen.getByTestId('TimerOutlinedIcon')
    expect(timer).toBeInTheDocument()
  })

  it('should render duration for the finished quiz for student', () => {
    const preloadedState = { appMain: { userRole: UserRoleEnum.Student } }

    useQuery.mockReturnValue({
      data: mockQuiz,
      isLoading: false
    })

    renderWithProviders(<Quiz />, {
      preloadedState
    })

    const finishButton = screen.getByText('quiz.finish')
    fireEvent.click(finishButton)

    const duration = screen.getByText(/quiz\.duration:/i)
    expect(duration).toBeInTheDocument()

    expect(duration).toBeInTheDocument()
  })
})
