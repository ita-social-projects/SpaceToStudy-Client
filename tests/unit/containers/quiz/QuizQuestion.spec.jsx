import QuizQuestion from '~/containers/quiz/quiz-question/Question.tsx'
import { render, screen } from '@testing-library/react'

const mockQuestion = {
  _id: '665e1f1a9946b3dbb292339f',
  title: 'Functions?',
  text: 'What is the difference between function expression and function declaration?',
  answers: [
    {
      text: 'Correct answer',
      isCorrect: true
    }
  ],
  type: 'oneAnswer'
}

describe('Quiz Question tests', () => {
  it('Should render QuizQuestion', () => {
    render(<QuizQuestion index={1} question={mockQuestion} />)

    const element = screen.getByText(mockQuestion.text)
    expect(element).toBeInTheDocument()
  })

  it('Should render correct answers', () => {
    render(
      <QuizQuestion index={1} question={mockQuestion} showCorrectAnswers />
    )

    const element = screen.getAllByText(mockQuestion.answers[0].text)[1]
    expect(element).toBeInTheDocument()
  })

  it('Should render points', () => {
    render(<QuizQuestion index={1} question={mockQuestion} showPoints />)

    const element = screen.getByText('0/1')
    expect(element).toBeInTheDocument()
  })
})
