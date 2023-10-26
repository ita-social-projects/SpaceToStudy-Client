import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import SelectableQuestionQuizView from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestionQuizView'

const questionsMock = [
  {
    _id: '653134fb761028cd0a3bfb8b',
    text: 'What is your first name',
    answers: [{ text: 'Peter', isCorrect: true }],
    type: 'multipleChoice'
  },
  {
    _id: '653134fb761028cd0a3bfb8c',
    text: 'What is your last name',
    answers: [{ text: 'Parker', isCorrect: true }],
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

  it('redirects to the next or previous question when you click on the Next or Back button', () => {
    const nextButton = screen.getByText('common.next')
    fireEvent.click(nextButton)

    const secondQuestion = screen.getByText(questionsMock[1].text)
    expect(secondQuestion).toBeInTheDocument()

    const backButton = screen.getByText('common.back')
    fireEvent.click(backButton)

    const firstQuestion = screen.getByText(questionsMock[0].text)
    expect(firstQuestion).toBeInTheDocument()
  })
})
