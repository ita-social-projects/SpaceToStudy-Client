import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ScrollQuestionsQuizView from '~/containers/my-quizzes/scroll-question-quiz-view/ScrollQuestionsQuizView'

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

describe('Tests scroll view quiz page', () => {
  beforeEach(() => {
    renderWithProviders(<ScrollQuestionsQuizView questions={mockedQuestion} />)
  })

  it('should render description', () => {
    const description = screen.getByText(/lorem ipsum/i)

    expect(description).toBeInTheDocument()
  })

  it('should render first quiz question', () => {
    const quizQuestionText = screen.getByText(mockedQuestion[0].text)

    expect(quizQuestionText).toBeInTheDocument()
  })

  it('should render second quiz question', () => {
    const quizQuestionText = screen.getByText(mockedQuestion[1].text)

    expect(quizQuestionText).toBeInTheDocument()
  })
})
