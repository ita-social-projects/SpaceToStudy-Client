import { screen, fireEvent, waitFor } from '@testing-library/react'

import QuizSettingsContainer from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { initialSettings } from '~/pages/new-quiz/NewQuiz.constants'

const setActiveTabMock = vi.fn()
const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

const questionMock = {
  _id: '6569a17751580b394953beaf',
  title: 'Question2',
  text: 'How old are you?',
  answers: [
    { text: '12', isCorrect: true },
    { text: '60', isCorrect: false }
  ],
  type: 'multipleChoice',
  category: { _id: '6569a11851580b394953be98', name: 'C1' }
}

const props = {
  title: 'test title',
  description: 'test description',
  questions: [questionMock],
  category: null,
  settings: initialSettings,
  setActiveTab: setActiveTabMock
}

describe('QuizSettingsContainer', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onPost(URLs.quizzes.add).reply(201, null)
      renderWithProviders(<QuizSettingsContainer {...props} />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render two settings titles', () => {
    const title1 = screen.getByText(
      'myResourcesPage.quizzes.settingsPointsAndAnswers'
    )
    const title2 = screen.getByText('myResourcesPage.quizzes.settingsQuiz')
    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
  })

  it('should toggle the "pointValues" switch and update data', () => {
    const switchElement = screen.getByTestId('pointValues-switch').firstChild

    fireEvent.click(switchElement)

    expect(switchElement).toBeChecked()
    expect(screen.getByTestId('pointValues-switch').firstChild.checked).toBe(
      true
    )
  })

  it('should toggle the "scoredUnscoredResponses" switch and update data', () => {
    const switchElement = screen.getByTestId('responses-switch').firstChild

    fireEvent.click(switchElement)

    expect(switchElement).toBeChecked()
    expect(screen.getByTestId('responses-switch').firstChild.checked).toBe(true)
  })

  it('should toggle the "correctAnswers" switch and update data', () => {
    const switchElement = screen.getByTestId('correctAnswers-switch').firstChild

    fireEvent.click(switchElement)

    expect(switchElement).toBeChecked()
    expect(screen.getByTestId('correctAnswers-switch').firstChild.checked).toBe(
      true
    )
  })

  it('should toggle the "shuffleQuestions" switch and update data', () => {
    const switchElement = screen.getByTestId('shuffle-switch').firstChild

    fireEvent.click(switchElement)

    expect(switchElement).toBeChecked()
    expect(screen.getByTestId('shuffle-switch').firstChild.checked).toBe(true)
  })

  it('should change view and click on apply', () => {
    const select = screen.getByTestId('app-select')

    expect(select.value).toBe('Scroll')

    fireEvent.change(select, { target: { value: 'Stepper' } })

    expect(select.value).toBe('Stepper')

    const applyButton = screen.getByText('common.apply')

    fireEvent.click(applyButton)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })
})
