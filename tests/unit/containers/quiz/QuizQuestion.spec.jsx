import { render, screen } from '@testing-library/react'
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
  it('Should render QuizQuestion', () => {
    renderWithProps()

    const element = screen.getByText(mockQuestion.text)
    expect(element).toBeInTheDocument()
  })

  it('Should render correct answers', () => {
    renderWithProps({ showCorrectAnswers: true })

    const element = screen.getAllByText(mockQuestion.answers[0].text)[1]
    expect(element).toBeInTheDocument()
  })

  it('Should render points', () => {
    renderWithProps({ showPoints: true })

    const element = screen.getByText('0/1')
    expect(element).toBeInTheDocument()
  })
})
