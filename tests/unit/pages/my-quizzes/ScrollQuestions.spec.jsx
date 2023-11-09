import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ScrollQuestions from '~/containers/my-quizzes/scroll-question/ScrollQuestions'

const mockedQuestion = {
  answers: [{ text: 'question1', isCorrect: true }],
  author: '6512d69a6d1ad343f7d1e2a9',
  category: { _id: '653fcc962a136b561a3ca015', name: 'Games' },
  text: 'mocked text',
  title: 'title 1',
  type: 'oneAnswer',
  _id: '654bd499f0812b6671e5cdf7'
}

describe('SelectableQuestion component test', () => {
  renderWithProviders(<ScrollQuestions question={mockedQuestion} />)

  it('should render first question text', () => {
    const text = screen.getByText(mockedQuestion.text)

    expect(text).toBeInTheDocument()
  })
})
