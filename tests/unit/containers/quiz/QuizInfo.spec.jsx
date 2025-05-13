import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import {
  TutorQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'
import { FinishedQuizInfo } from '~/containers/quiz/quiz-info/QuizInfo'
import { QuizAttempt, QuizTimeLimit } from '~/types'

describe('TutorQuizInfo', () => {
  it('should render graded quiz info with proper content', () => {
    renderWithProviders(<TutorQuizInfo points={8} totalPoints={10} />)

    expect(screen.getByText('quiz.points')).toBeInTheDocument()
    expect(screen.getByText('quiz.save')).toBeInTheDocument()
    expect(screen.getByText('8/10')).toBeInTheDocument()
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
    expect(screen.getByTestId('startButton')).toBeInTheDocument()
  })

  it('should call handleStartButton on start button click', () => {
    renderWithProviders(
      <StartViewQuizInfo
        {...defaultProps}
        attempts={QuizAttempt.Attempt1}
        timeLimit={QuizTimeLimit.NoLimit}
      />
    )

    const button = screen.getByTestId('startButton')
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
      />,
      {
        preloadedState: {
          appMain: {
            userRole: 'student'
          }
        }
      }
    )

    expect(screen.getByText('quiz.tryAgain')).toBeInTheDocument()
  })

  it('should disable start button and show alert if attempt limit reached', () => {
    renderWithProviders(
      <StartViewQuizInfo
        {...defaultProps}
        attempts={QuizAttempt.Attempt1}
        timeLimit={QuizTimeLimit.Minute10}
        usedAttempts={1}
      />,
      {
        preloadedState: {
          appMain: {
            userRole: 'student'
          }
        }
      }
    )

    const startButton = screen.getByTestId('startButton')
    expect(startButton).toBeDisabled()
    expect(screen.getByText('quiz.reachedAttemptLimit')).toBeInTheDocument()
  })
  it('should render correctly with no limits on attempts and time', () => {
    renderWithProviders(
      <StartViewQuizInfo
        attempts={QuizAttempt.NoLimit}
        onStart={vi.fn()}
        questionsAmount={5}
        timeLimit={QuizTimeLimit.NoLimit}
        usedAttempts={0}
      />,
      {
        preloadedState: {
          appMain: {
            userRole: 'student'
          }
        }
      }
    )

    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.queryByText('quiz.attemptLimit')).not.toBeInTheDocument()
    expect(screen.queryByText('quiz.timeLimit')).not.toBeInTheDocument()
    expect(
      screen.queryByText('quiz.reachedAttemptLimit')
    ).not.toBeInTheDocument()
  })
  it('should show 0 points if points prop is undefined', () => {
    renderWithProviders(<TutorQuizInfo points={undefined} totalPoints={10} />)

    expect(screen.getByText('0/10')).toBeInTheDocument()
  })
})

describe('FinishedQuizInfo', () => {
  it('should render quiz information correctly', () => {
    renderWithProviders(
      <FinishedQuizInfo
        createdAt='2024-01-01T10:00:00Z'
        points={10}
        totalPoints={8}
        updatedAt='2024-01-01T10:10:00Z'
      />
    )

    expect(screen.getByText(/quiz.attemptFinished/i)).toBeInTheDocument()
    expect(screen.getByText(/quiz.duration/i)).toBeInTheDocument()
    expect(screen.getByText(/quiz.points/i)).toBeInTheDocument()
  })
})
