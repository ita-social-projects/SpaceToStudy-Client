import { screen, render } from '@testing-library/react'
import Question from '~/components/question/Question'

const mockedQuestion = {
  question: {
    title: 'About Philosophy',
    answers: [
      {
        id: '1',
        text: 'Buddha Shakyamuni',
        isCorrect: true
      },
      {
        id: '2',
        text: 'Jordan Belfort',
        isCorrect: false
      }
    ],
    text: 'Who created buddhism?',
    id: '1'
  },
  category: {
    _id: 'some-text-id-123',
    name: 'Philosophy'
  }
}

describe('Question', () => {
  beforeEach(() => {
    render(<Question {...mockedQuestion} />)
  })

  it('render question text', () => {
    const questionText = screen.getByText(mockedQuestion.question.text)

    expect(questionText).toBeInTheDocument()
  })

  it('render question category', () => {
    const category = screen.getByText(mockedQuestion.category.name)

    expect(category).toBeInTheDocument()
  })
})
