import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import {
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'

import { QuizAttempt, QuizTimeLimit } from '~/types'

describe('UngradedQuizInfo', () => {
  beforeEach(() => {
    renderWithProviders(<UngradedQuizInfo />)
  })

  it('should render ungraded quiz info with a proper content', () => {
    
    const attemptFinished = screen.getByText((_, element) => {
      return (
        element?.textContent?.includes('quiz.attemptFinished') &&
        element.tagName.toLowerCase() === 'p'
      )
    })

    expect(attemptFinished).toBeInTheDocument()

    const duration = screen.getByText((_, element) => {
      return (
        element?.textContent?.includes('quiz.duration') &&
        element.tagName.toLowerCase() === 'p'
      )
    })

    expect(duration).toBeInTheDocument()
    expect(screen.getByText('quiz.evaluate')).toBeInTheDocument()
  })
})

describe('GradedQuizInfo', () => {
  beforeEach(() => {
    renderWithProviders(<GradedQuizInfo />)
  })

  it('should render graded quiz info with a proper content', () => {

    expect(screen.getByText('quiz.points')).toBeInTheDocument()
    expect(screen.getByText('quiz.save')).toBeInTheDocument()
  })
})

describe('StartViewQuizInfo', () => {
  const mockHandleStartButton = vi.fn()
  const defaultProps = {
    questionsAmount: 3,
    attempts: QuizAttempt.Attempt2,
    timeLimit: QuizTimeLimit.Minute30,
    handleStartButton: mockHandleStartButton,
    usedAttempts: 0
  }

  it('should render quiz info correctly', () => {
    renderWithProviders(<StartViewQuizInfo {...defaultProps} />)

    expect(screen.getByText('quiz.questionsAmount:')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('quiz.attemptLimit:')).toBeInTheDocument()
    expect(screen.getByText('0/2')).toBeInTheDocument()
    expect(screen.getByText('quiz.timeLimit:')).toBeInTheDocument()
    expect(screen.getByText('myResourcesPage.quizzes.types.minute30')).toBeInTheDocument()
    expect(screen.getByText('quiz.startQuiz')).toBeInTheDocument()
  })

  it('should call handleStartButton on start button click', () => {
    renderWithProviders(<StartViewQuizInfo {...defaultProps}
      attempts={QuizAttempt.Attempt1}
      timeLimit={QuizTimeLimit.NoLimit}/>)

    const button = screen.getByText('quiz.startQuiz')
    fireEvent.click(button)

    expect(mockHandleStartButton).toHaveBeenCalledWith(false)
  })

  it('should render try again button if not first attempt', () => {
    renderWithProviders(<StartViewQuizInfo {...defaultProps}
      attempts={QuizAttempt.Attempt3}
      timeLimit={QuizTimeLimit.NoLimit}
      usedAttempts={2}/>)

    expect(screen.getByText('quiz.tryAgain')).toBeInTheDocument()
  })
})