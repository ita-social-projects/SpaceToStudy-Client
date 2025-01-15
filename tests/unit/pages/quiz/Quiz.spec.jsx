import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Quiz from '~/pages/quiz/Quiz'

vi.mock('~/hooks/use-query', () => ({
  default: vi.fn(() => ({
    data: {
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
      settings: {
        view: 'Stepper',
        shuffle: false,
        pointValues: true,
        scoredResponses: true,
        correctAnswers: true
      },
      createdAt: '2024-05-12T21:45:51.693Z',
      updatedAt: '2024-06-07T07:05:33.052Z',
      availability: { status: 'open', date: null },
      description: 'Js'
    },
    isLoading: false,
    isError: false
  }))
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: vi.fn(() => ({ quizId: '123' }))
  }
})

describe('Quiz Page', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<Quiz />)
    })
  })

  it('should render Quiz page with title and description', async () => {
    const title = await screen.findByText('JS Quiz')
    const description = await screen.findByText('Js')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should toggle checkbox value', async () => {
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveProperty('checked', false)

    fireEvent.click(checkbox)

    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should display correct answers after finishing quiz', async () => {
    const finishButton = screen.getByText('quiz.finish')

    fireEvent.click(finishButton)

    const correctAnswersLabel = await screen.findByText(
      'myResourcesPage.quizzes.correctAnswers'
    )

    expect(correctAnswersLabel).toBeInTheDocument()
  })

  it('should render questions correctly', async () => {
    const questionText = await screen.findByText(
      'What is the difference between function expression and function declaration?'
    )

    expect(questionText).toBeInTheDocument()
  })

  it('should display points and answers correctness after finishing quiz', async () => {
    const finishButton = screen.getByText('quiz.finish')

    fireEvent.click(finishButton)

    const pointsLabel = await screen.findByText('quiz.points')
    const answersCorrectnessLabel = await screen.findByText(
      'myResourcesPage.quizzes.correctAnswers'
    )

    expect(pointsLabel).toBeInTheDocument()
    expect(answersCorrectnessLabel).toBeInTheDocument()
  })
})
