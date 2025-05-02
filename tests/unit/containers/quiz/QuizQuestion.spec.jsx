import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import QuizQuestion from '~/containers/quiz/quiz-question/Question.tsx'
import { renderWithProviders } from '~tests/test-utils'

const mockQuestion = {
  _id: '665e1f1a9946b3dbb292339f',
  title: 'Functions',
  text: 'What is the difference between function expression and function declaration?',
  answers: [
    {
      text: 'Correct answer',
      isCorrect: true
    }
  ],
  type: 'oneAnswer'
}

const openAnswerQuestion = {
  ...mockQuestion,
  type: 'openAnswer'
}

const defaultProps = {
  shouldUseAppCardWrapper: false,
  sx: {},
  shouldShowPoints: true,
  shouldShowCorrectAnswers: true,
  shouldShowAnswersCorrectness: true,
  isEditable: true,
  value: '',
  handleInputChange: vi.fn(),
  handleNonInputValueChange: vi.fn()
}

const renderWithProps = (props = {}) =>
  renderWithProviders(
    <QuizQuestion
      index={1}
      question={mockQuestion}
      {...defaultProps}
      {...props}
    />
  )

describe('Quiz Question tests', () => {
  it('should render QuizQuestion', () => {
    renderWithProps()
    const element = screen.getByText(mockQuestion.text)
    expect(element).toBeInTheDocument()
  })

  it('should render correct answers', () => {
    renderWithProps({ shouldShowCorrectAnswers: true })
    const elements = screen.getAllByText(mockQuestion.answers[0].text)
    expect(elements.length).toBeGreaterThan(0)
    expect(elements[0]).toBeInTheDocument()
  })

  it('should render points', () => {
    renderWithProps({ shouldShowPoints: true })
    const element = screen.getByText('0/1')
    expect(element).toBeInTheDocument()
  })

  it('should render correctness icon if shouldShowAnswersCorrectness is true', () => {
    renderWithProps({
      shouldShowAnswersCorrectness: true,
      value: 'Correct answer'
    })

    const icon = screen.getAllByTestId('CheckIcon')[0]
    expect(icon).toBeInTheDocument()
  })

  it('should render open answer input field', () => {
    renderWithProps({
      question: openAnswerQuestion
    })

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'Correct answer' } })
    expect(input).toHaveValue('Correct answer')
  })

  it('should not render points when shouldShowPoints is false', () => {
    renderWithProps({ shouldShowPoints: false })
    const pointsText = screen.queryByText('0/1')
    expect(pointsText).not.toBeInTheDocument()
  })

  it('should render CheckIcon if open answer is correct and correctness is enabled', () => {
    const mockFinishedQuiz = {
      results: [
        {
          question: mockQuestion.text,
          answers: [{ isCorrect: true }]
        }
      ]
    }

    renderWithProps({
      question: openAnswerQuestion,
      shouldShowAnswersCorrectness: true,
      isOpenAnswer: true,
      finishedQuiz: mockFinishedQuiz,
      isFinishedQuizLoading: false,
      value: 'Correct answer'
    })

    const checkIcon = screen.getByTestId('CheckIcon')
    expect(checkIcon).toBeInTheDocument()
  })
  it('shouldn"t render correctness icon if shouldShowAnswersCorrectness is false', () => {
    renderWithProps({
      shouldShowPoints: false,
      shouldShowCorrectAnswers: false,
      shouldShowAnswersCorrectness: false
    })

    const correctAnswer = screen.queryByText('Correct answer')
    expect(correctAnswer).not.toBeInTheDocument()
  })
})
