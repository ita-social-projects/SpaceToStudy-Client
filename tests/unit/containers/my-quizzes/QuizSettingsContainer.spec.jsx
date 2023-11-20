import QuizSettingsContainer from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer'
import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent } from '@testing-library/react'

describe('QuizSettingsContainer', () => {
  beforeEach(() => {
    renderWithProviders(<QuizSettingsContainer />)
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
})
