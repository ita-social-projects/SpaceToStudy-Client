import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import QuizQuestion from '~/containers/quiz/quiz-question/Question.tsx'

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

const renderWithProps = (props = {}) =>
  render(<QuizQuestion index={1} question={mockQuestion} {...props} />)

describe('Quiz Question tests', () => {
  it('should render QuizQuestion', () => {
    renderWithProps()

    const element = screen.getByText(mockQuestion.text)
    expect(element).toBeInTheDocument()
  })

  it('should render correct answers', () => {
    renderWithProps({ shouldShowCorrectAnswers: true })

    const element = screen.getAllByText(mockQuestion.answers[0].text)[1]
    expect(element).toBeInTheDocument()
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
    const handleInputChangeMock = vi.fn((e) => e.target.value)
    const openAnswerQuestion = { ...mockQuestion, type: 'openAnswer' }
    renderWithProps({
      question: openAnswerQuestion,
      value: '',
      handleInputChange: handleInputChangeMock
    })

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'Correct answer' } })
    expect(handleInputChangeMock).toHaveBeenCalled()
  })
})
