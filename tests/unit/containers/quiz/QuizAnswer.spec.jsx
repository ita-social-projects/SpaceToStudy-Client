import Answer from '~/containers/quiz/question-answer/Answer.tsx'
import { screen, render } from '@testing-library/react'

const mockAnswer = {
  text: 'Right answer',
  isCorrect: true,
  label: 'How are you?',
  checked: true,
  type: 'oneAnswer',
  isEditable: true
}

describe('Test answer component', () => {
  beforeEach(() => {})

  it('should render answer component with one answer', () => {
    render(<Answer {...mockAnswer} />)

    const answerInput = screen.getByRole('radio')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render answer component with multiple answer', () => {
    render(<Answer {...mockAnswer} type='multipleChoice' />)

    const answerInput = screen.getByRole('checkbox')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render answer component with open answer', () => {
    render(<Answer {...mockAnswer} type='openAnswer' />)

    const answerInput = screen.getByRole('textbox')
    expect(answerInput).toBeInTheDocument()
  })

  it('should render uneditable answer component', () => {
    const uneditableMockAnswer = {
      ...mockAnswer,
      isEditable: false
    }
    render(<Answer {...uneditableMockAnswer} />)

    const answerInput = screen.getByRole('radio')
    expect(answerInput).toHaveProperty('disabled', true)
  })
})
