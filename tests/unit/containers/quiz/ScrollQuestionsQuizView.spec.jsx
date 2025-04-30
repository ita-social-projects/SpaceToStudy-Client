import { screen } from '@testing-library/react'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import { renderWithProviders } from '~tests/test-utils'

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

const mockedProps = {
  answers: {},
  questions: mockedQuestion,
  handleInputChange: () => {},
  handleNonInputValueChange: () => {}
}

describe('Tests scroll view quiz page', () => {
  it('should render SelectableQuestionQuizView when isStepper is true', () => {
    const propsWithStepper = { ...mockedProps, isStepper: true }
    renderWithProviders(<SelectableQuestionQuizView {...propsWithStepper} />)

    const quizQuestionText = screen.getByText(mockedQuestion[0].text)
    expect(quizQuestionText).toBeInTheDocument()
  })

  it('should render ScrollQuestionsQuizView when isStepper is false', () => {
    const propsWithoutStepper = { ...mockedProps, isStepper: false }
    renderWithProviders(<ScrollQuestionsQuizView {...propsWithoutStepper} />)

    const quizQuestionText = screen.getByText(mockedQuestion[0].text)
    expect(quizQuestionText).toBeInTheDocument()
  })

  it('should render second quiz question in ScrollQuestionsQuizView', () => {
    const propsWithoutStepper = { ...mockedProps, isStepper: false }
    renderWithProviders(<ScrollQuestionsQuizView {...propsWithoutStepper} />)

    const quizQuestionText = screen.getByText(mockedQuestion[1].text)
    expect(quizQuestionText).toBeInTheDocument()
  })
})
