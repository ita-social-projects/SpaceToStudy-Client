import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import QuizQuestion from '~/containers/quiz/quiz-question/Question.tsx'
import { renderWithProviders } from '~tests/test-utils'
import { ResourceService } from '~/services/resource-service'
import { UserRoleEnum } from '~/types'

const mockQuestion = {
  _id: '665e1f1a9946b3dbb292339f',
  title: 'Functions',
  text: 'What is the difference between function expression and function declaration?',
  answers: [
    { text: 'Correct answer', isCorrect: true },
    { text: 'Incorrect answer', isCorrect: false }
  ],
  type: 'oneAnswer'
}

const openAnswerQuestion = {
  ...mockQuestion,
  type: 'openAnswer'
}

const defaultProps = {
  shouldUseAppCardWrapper: false,
  sx: {},
  shouldShowPoints: true,
  shouldShowCorrectAnswers: true,
  shouldShowAnswersCorrectness: true,
  isEditable: true,
  value: '',
  handleInputChange: vi.fn(),
  handleNonInputValueChange: vi.fn()
}

const renderWithProps = (props = {}) =>
  renderWithProviders(
    <QuizQuestion
      index={1}
      question={mockQuestion}
      {...defaultProps}
      {...props}
    />,
    {
      preloadedState: {
        appMain: { userRole: props.userRole }
      }
    }
  )

describe('QuizQuestion', () => {
  it('should render question text', () => {
    renderWithProps()
    expect(screen.getByText(mockQuestion.text)).toBeInTheDocument()
  })

  it('should render correct answer', () => {
    renderWithProps({ shouldShowCorrectAnswers: true })
    const correctAnswers = screen.getAllByText('Correct answer')
    expect(correctAnswers.length).toBeGreaterThan(0)
  })

  it('should render points if enabled', () => {
    renderWithProps({ shouldShowPoints: true, value: 'Incorrect answer' })
    expect(screen.getByText('0/1')).toBeInTheDocument()
  })

  it('should render CheckIcon when answer is correct', () => {
    renderWithProps({
      shouldShowAnswersCorrectness: true,
      value: 'Correct answer'
    })
    expect(screen.getAllByTestId('CheckIcon')[0]).toBeInTheDocument()
  })

  it('should render input field for open answer', () => {
    renderWithProps({
      question: openAnswerQuestion,
      userRole: UserRoleEnum.Student
    })
    expect(
      screen.getByText('myResourcesPage.questions.reviewMessage')
    ).toBeInTheDocument()
  })

  it('should not render points if disabled', () => {
    renderWithProps({ shouldShowPoints: false })
    expect(screen.queryByText('0/1')).not.toBeInTheDocument()
  })

  it('should fetch quiz result and updates icon', async () => {
    const mockFinishedQuiz = {
      results: [
        {
          question: mockQuestion.text,
          answers: [{ isCorrect: true }]
        }
      ]
    }

    vi.spyOn(ResourceService, 'getFinishedQuiz').mockResolvedValue(
      mockFinishedQuiz
    )

    renderWithProps({
      question: openAnswerQuestion,
      shouldShowAnswersCorrectness: true,
      userRole: UserRoleEnum.Student,
      value: 'Correct answer'
    })

    await screen.findByTestId('CheckIcon')
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
  })

  it('should show teacher message for tutor on openAnswer', async () => {
    renderWithProviders(
      <QuizQuestion {...defaultProps} question={openAnswerQuestion} />,
      {
        preloadedState: {
          appMain: { userRole: UserRoleEnum.Tutor }
        }
      }
    )

    const teacherMessage = await screen.findByText(
      'myResourcesPage.questions.teacherMessage'
    )
    expect(teacherMessage).toBeInTheDocument()
  })

  it('should show review message for student on openAnswer', async () => {
    renderWithProviders(
      <QuizQuestion {...defaultProps} question={openAnswerQuestion} />,
      {
        preloadedState: {
          appMain: { userRole: UserRoleEnum.Student }
        }
      }
    )

    const reviewMessage = await screen.findByText(
      'myResourcesPage.questions.reviewMessage'
    )
    expect(reviewMessage).toBeInTheDocument()
  })

  it('should not render correct answer when correctness is disabled', () => {
    renderWithProps({
      shouldShowPoints: false,
      shouldShowCorrectAnswers: false,
      shouldShowAnswersCorrectness: false
    })

    expect(
      screen.queryByDisplayValue('myResourcesPage.quizzes.correctAnswers')
    ).not.toBeInTheDocument()
  })
  it('should render CheckIcon for open answer if correct and results are given', () => {
    renderWithProps({
      question: openAnswerQuestion,
      shouldShowAnswersCorrectness: true,
      userRole: UserRoleEnum.Student,
      value: 'Correct answer'
    })

    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
  })
  it('should render gracefully with no answers', () => {
    const noAnswerQuestion = { ...mockQuestion, answers: [] }
    renderWithProps({ question: noAnswerQuestion })

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })
  it('should handle null value without crashing', () => {
    renderWithProps({ value: null })
    expect(screen.getByText(mockQuestion.text)).toBeInTheDocument()
  })
})
