import { screen, render } from '@testing-library/react'
import Answer from '~/containers/quiz/question-answer/Answer.tsx'

const mockAnswer = {
  text: 'Right answer',
  isCorrect: true,
  label: 'How are you?',
  checked: true,
  type: 'oneAnswer',
  isEditable: true
}

const renderWithProps = (props = {}) =>
  render(<Answer {...mockAnswer} {...props} />)

describe('Test answer component', () => {
  it('should render answer component with one answer', () => {
    renderWithProps()

    const answerInput = screen.getByRole('radio')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render answer component with multiple answer', () => {
    renderWithProps({ type: 'multipleChoice' })

    const answerInput = screen.getByRole('checkbox')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render answer component with open answer', () => {
    renderWithProps({ type: 'openAnswer' })

    const answerInput = screen.getByRole('textbox')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render uneditable answer component', () => {
    renderWithProps({ isEditable: false })

    const answerInput = screen.getByRole('radio')
    expect(answerInput).toHaveProperty('disabled', true)
  })
})
