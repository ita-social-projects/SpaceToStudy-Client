import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import SelectableQuestionQuizView from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestionQuizView'

const questionsMock = [
  {
    _id: '653134fb761028cd0a3bfb8b',
    text: 'What is your name',
    answers: [{ text: 'Peter', isCorrect: true }],
    type: 'multipleChoice'
  }
]

describe('SelectableQuestion component test', () => {
  beforeEach(() => {
    renderWithProviders(
      <SelectableQuestionQuizView questions={questionsMock} />
    )
  })

  it('renders the component with question', () => {
    const text = screen.getByText(questionsMock[0].text)

    expect(text).toBeInTheDocument()
  })

  it('renders component with checkbox', () => {
    const checkbox = screen.getByTestId('CheckBoxOutlineBlankIcon')

    expect(checkbox).toBeInTheDocument()
  })
})
