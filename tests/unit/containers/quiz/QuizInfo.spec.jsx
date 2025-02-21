import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import {
  TutorQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'

import { QuizAttempt, QuizTimeLimit } from '~/types'

describe('TutorQuizInfo', () => {
  beforeEach(() => {
    renderWithProviders(<TutorQuizInfo />)
  })

  it('should render graded quiz info with a proper content', () => {
    expect(screen.getByText('quiz.points')).toBeInTheDocument()
    expect(screen.getByText('quiz.save')).toBeInTheDocument()
  })
})

describe('StartViewQuizInfo', () => {
  const mockHandleStart = vi.fn()
  const defaultProps = {
    questionsAmount: 3,
    attempts: QuizAttempt.Attempt2,
    timeLimit: QuizTimeLimit.Minute30,
    onStart: mockHandleStart,
    usedAttempts: 0
  }

  it('should render quiz info correctly', () => {
    renderWithProviders(<StartViewQuizInfo {...defaultProps} />)

    expect(screen.getByText('quiz.questionsAmount:')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('quiz.attemptLimit:')).toBeInTheDocument()
    expect(screen.getByText('0/2')).toBeInTheDocument()
    expect(screen.getByText('quiz.timeLimit:')).toBeInTheDocument()
    expect(
      screen.getByText('myResourcesPage.quizzes.types.minute30')
    ).toBeInTheDocument()
    expect(screen.getByText('quiz.startQuiz')).toBeInTheDocument()
  })

  it('should call handleStartButton on start button click', () => {
    renderWithProviders(
      <StartViewQuizInfo
        {...defaultProps}
        attempts={QuizAttempt.Attempt1}
        timeLimit={QuizTimeLimit.NoLimit}
      />
    )

    const button = screen.getByText('quiz.startQuiz')
    fireEvent.click(button)

    expect(mockHandleStart).toHaveBeenCalledOnce()
  })

  it('should render try again button if not first attempt', () => {
    renderWithProviders(
      <StartViewQuizInfo
        {...defaultProps}
        attempts={QuizAttempt.Attempt3}
        timeLimit={QuizTimeLimit.NoLimit}
        usedAttempts={2}
      />
    )

    expect(screen.getByText('quiz.tryAgain')).toBeInTheDocument()
  })
})
