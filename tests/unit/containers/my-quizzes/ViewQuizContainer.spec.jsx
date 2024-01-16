import { screen } from '@testing-library/react'

import ViewQuizContainer from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer'

import { renderWithProviders } from '~tests/test-utils'
import { initialSettings } from '~/pages/new-quiz/NewQuiz.constants'

const mockedTitle = 'Title'
const mockedDescription = 'Description'

const mockedQuestion = [
  {
    answers: [{ text: 'question1', isCorrect: true }],
    author: '6512d69a6d1ad343f7d1e2a9',
    category: { _id: '653fcc962a136b561a3ca015', name: 'Games' },
    text: 'mocked text',
    title: 'title 1',
    type: 'oneAnswer',
    _id: '654bd499f0812b6671e5cdf7'
  },
  {
    answers: [
      { text: 'question2', isCorrect: true },
      { text: 'question3', isCorrect: false }
    ],
    author: '6512d69a6d1ad343f7d1e2a9',
    category: { _id: '653fcc962a136b561a3ca015', name: 'Sport' },
    text: 'mocked text 2',
    title: 'title 2',
    type: 'oneAnswer',
    _id: '654bd499f0812b6671e5cdf8'
  }
]

describe('ViewQuizContainer test', () => {
  beforeEach(() => {
    renderWithProviders(
      <ViewQuizContainer
        description={mockedDescription}
        questions={mockedQuestion}
        settings={initialSettings}
        title={mockedTitle}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText(mockedTitle)
    expect(title).toBeInTheDocument()
  })
})
