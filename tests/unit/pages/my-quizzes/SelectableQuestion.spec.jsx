import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import SelectableQuestion from '~/containers/my-quizzes/selectable-question/SelectableQuestion'

const questionMock = {
  text: 'What is your name',
  answers: [{ text: 'Peter', isCorrect: true }],
  type: 'multipleChoice'
}

describe('SelectableQuestion component test', () => {
  beforeEach(() => {
    renderWithProviders(
      <SelectableQuestion question={questionMock} selectedIndex={0} />
    )
  })

  it('renders the component with question', () => {
    const text = screen.getByText(questionMock.text)

    expect(text).toBeInTheDocument()
  })
})
