import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import QuizQuestion from '~/containers/my-quizzes/quiz-question/QuizQuestion'

const questionMock = {
  text: 'What is your name',
  answers: [{ text: 'Peter', isCorrect: true }],
  type: 'multipleChoice'
}

const root = {
  display: 'block',
  p: '20px 30px'
}

describe('QuizQuestion component test', () => {
  beforeEach(() => {
    renderWithProviders(
      <QuizQuestion index={0} question={questionMock} sx={root} />
    )
  })

  it('renders the component with question', () => {
    const text = screen.getByText(questionMock.text)

    expect(text).toBeInTheDocument()
  })
})
