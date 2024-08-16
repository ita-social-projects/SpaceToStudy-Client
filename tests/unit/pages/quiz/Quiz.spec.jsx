import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import Quiz from '~/pages/quiz/Quiz'
import useAxios from '~/hooks/use-axios'

import { ResourcesTypesEnum as ResourceType } from '~/types'

vi.mock('~/hooks/use-axios')

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

const mockData = {
  loading: false,
  response: mockQuiz,
  fetchData: vi.fn()
}

describe('Test quiz page', () => {
  useAxios.mockImplementation(() => mockData)

  beforeEach(() => {
    renderWithProviders(<Quiz />)
  })

  afterAll(() => {
    useAxios.mockReset()
  })

  it('should render Quiz page', () => {
    const quizTitle = screen.getByText('JS Quiz')

    expect(quizTitle).toBeInTheDocument()
  })

  it('should change values of inputs', () => {
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveProperty('checked', false)

    act(() => {
      fireEvent.click(checkbox)
    })

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should show correct answers after finish was clicked', () => {
    const finishButton = screen.getByText('quiz.finish')

    expect(finishButton).toBeInTheDocument()

    act(() => {
      fireEvent.click(finishButton)
    })

    const correctAnswersLabel = screen.getByText(
      'myResourcesPage.quizzes.correctAnswers'
    )

    expect(correctAnswersLabel).toBeInTheDocument()
  })

  it('should render ScrollQuestionsQuizView with correct props', () => {
    const questionText = screen.getByText(
      'What is the difference between function expression and function declaration?'
    )

    expect(questionText).toBeInTheDocument()
  })

  it('should render points and answers correctness when finished', () => {
    const finishButton = screen.getByText('quiz.finish')
    fireEvent.click(finishButton)
    const pointsLabel = screen.getByText('quiz.points')
    const answersCorrectnessLabel = screen.getByText(
      'myResourcesPage.quizzes.correctAnswers'
    )

    expect(pointsLabel).toBeInTheDocument()
    expect(answersCorrectnessLabel).toBeInTheDocument()
  })
})
