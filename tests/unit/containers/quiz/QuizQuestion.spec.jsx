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
})
