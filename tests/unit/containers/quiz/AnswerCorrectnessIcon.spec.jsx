import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AnswerCorrectnessIcon from '~/containers/quiz/question-answer/AnswerCorrectnessIcon'

describe('AnswerCorrectnessIcon', () => {
  it('should render CheckIcon when answer is correct and shouldShow is true', () => {
    renderWithProviders(<AnswerCorrectnessIcon isCorrect shouldShow />)

    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
  })

  it('should render CloseIcon when answer is incorrect and shouldShow is true', () => {
    renderWithProviders(<AnswerCorrectnessIcon isCorrect={false} shouldShow />)

    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument()
  })

  it('should not render any icon when shouldShow is false', () => {
    renderWithProviders(<AnswerCorrectnessIcon isCorrect shouldShow={false} />)

    expect(screen.queryByTestId('CheckIcon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()
  })

  it('should not render any icon when isCorrect is undefined', () => {
    renderWithProviders(<AnswerCorrectnessIcon shouldShow />)

    expect(screen.queryByTestId('CheckIcon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()
  })
})
