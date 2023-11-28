import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ViewQuizContainer from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer'

const mockedTitle = 'Title'

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
      { text: 'question2', isCorrect: false }
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
      <ViewQuizContainer questions={mockedQuestion} title={mockedTitle} />
    )
  })

  it('should render title', () => {
    const title = screen.getByText(mockedTitle)
    expect(title).toBeInTheDocument()
  })
})
