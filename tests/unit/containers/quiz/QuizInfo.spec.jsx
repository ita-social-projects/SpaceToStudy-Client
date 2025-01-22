import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  UngradedQuizInfo,
  GradedQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'

describe('UngradedQuizInfo', () => {
  it('renders ungraded quiz info with a proper content', () => {
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
  it('renders graded quiz info with a proper content', () => {
    render(<GradedQuizInfo />)

    expect(screen.getByText('quiz.points')).toBeInTheDocument()
    expect(screen.getByText('quiz.save')).toBeInTheDocument()
  })
})
