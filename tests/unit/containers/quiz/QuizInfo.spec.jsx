import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'

import { QuizAttempt, QuizTimeLimit } from '~/types'
describe('UngradedQuizInfo', () => {
  it('should render ungraded quiz info with a proper content', () => {
    render(<UngradedQuizInfo />)

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
  it('should render graded quiz info with a proper content', () => {
    render(<GradedQuizInfo />)

    expect(screen.getByText('quiz.points')).toBeInTheDocument()
    expect(screen.getByText('quiz.save')).toBeInTheDocument()
  })
})
describe('StartViewQuizInfo', () => {
  const mockHandleStartButton = vi.fn()

  it('should render quiz info correctly', () => {
    render(
      <StartViewQuizInfo
        questionsAmount={10}
        attempts={QuizAttempt.Attempt2}
        timeLimit={QuizTimeLimit.Minute30}
        isFirstAttempt={true}
        handleStartButton={mockHandleStartButton}
      />
    )

    expect(screen.getByText('quiz.questionsAmount:')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('quiz.attemptLimit:')).toBeInTheDocument()
    expect(screen.getByText('1/2')).toBeInTheDocument()
    expect(screen.getByText('quiz.timeLimit:')).toBeInTheDocument()
    expect(screen.getByText('myResourcesPage.quizzes.types.minute30')).toBeInTheDocument()
    expect(screen.getByText('quiz.startQuiz')).toBeInTheDocument()
  })

  it('should call handleStartButton on start button click', () => {
    render(
      <StartViewQuizInfo
        questionsAmount={5}
        attempts={QuizAttempt.Attempt1}
        timeLimit={QuizTimeLimit.NoLimit}
        isFirstAttempt={true}
        handleStartButton={mockHandleStartButton}
      />
    )

    const button = screen.getByText('quiz.startQuiz')
    fireEvent.click(button)
    expect(mockHandleStartButton).toHaveBeenCalledWith(false)
  })

  it('should render try again button if not first attempt', () => {
    render(
      <StartViewQuizInfo
        questionsAmount={5}
        attempts={QuizAttempt.Attempt2}
        timeLimit={QuizTimeLimit.NoLimit}
        isFirstAttempt={false}
        handleStartButton={mockHandleStartButton}
      />
    )

    expect(screen.getByText('quiz.tryAgain')).toBeInTheDocument()
  })
})