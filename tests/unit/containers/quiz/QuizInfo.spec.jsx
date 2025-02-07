import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import {
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'

import { QuizAttempt, QuizTimeLimit } from '~/types'

const finishedQuizzes = [
  {
    _id: '679bd116efb62d7f24ff6f1e',
    quiz: '678a859631dbe90b2a3ff5a1',
    grade: 43,
    results: [
      {
        question: 'What is UI and UX meaning?',
        answers: [{ text: 'User Interface and User Experience' }, { text: 'Universal Index and User Exchange' }]
      },
      {
        question: 'What is UX?',
        answers: [{ text: 'User Experience' }, { text: 'User Exchange' }, { text: 'Universal Experiment' }]
      },
      {
        question: 'Which of the following are key principles of effective UI/UX design?',
        answers: [
          { text: 'Consistency' },
          { text: 'Accessibility' },
          { text: 'Simplicity' },
          { text: 'Complexity' },
          { text: 'Fast loading speed' }
        ]
      }
    ]
  },
  {
    _id: '679bd116efb62d7f24ff6f1e',
    quiz: '678a859631dbe90b2a3ff5a1',
    grade: 50,
    results: [
      {
        question: 'What is UI and UX meaning?',
        answers: [{ text: 'User Interface and User Experience' }, { text: 'Universal Index and User Exchange' }]
      },
      {
        question: 'What is UX?',
        answers: [{ text: 'User Experience' }, { text: 'User Exchange' }, { text: 'Universal Experiment' }]
      },
      {
        question: 'Which of the following are key principles of effective UI/UX design?',
        answers: [
          { text: 'Consistency' },
          { text: 'Accessibility' },
          { text: 'Simplicity' },
          { text: 'Complexity' },
          { text: 'Fast loading speed' }
        ]
      }
    ]
  }
]

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
    usedAttempts: []
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
      usedAttempts={finishedQuizzes}/>)

    expect(screen.getByText('quiz.tryAgain')).toBeInTheDocument()
  })
})