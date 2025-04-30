import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TutorAnswerGrading from '~/containers/quiz/quiz-question/TutorAnswerGrading'
import { renderWithProviders } from '~tests/test-utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'),
  useParams: () => ({
    id: 'coop1',
    quizId: 'quiz1',
    attemptId: 'attempt1'
  }),
  useNavigate: vi.fn(),
  useLocation: () => ({ pathname: '/test' })
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    editFinishedQuiz: vi.fn(),
    getFinishedQuizzesByQuizId: vi.fn()
  }
}))

vi.mock('@tanstack/react-query', () => ({
  ...require('@tanstack/react-query'),
  useMutation: vi.fn(),
  useQuery: vi.fn()
}))

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

describe('TutorAnswerGrading', () => {
  const mutateMock = vi.fn()
  const mockRefetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    useMutation.mockReturnValue({
      mutate: mutateMock,
      onError: vi.fn(),
      onSuccess: vi.fn()
    })

    useQuery.mockReturnValue({
      data: [
        {
          _id: 'attempt1',
          results: [
            {
              question: 'Test question',
              answers: [{ isCorrect: false, isChosen: true }]
            }
          ]
        }
      ],
      isLoading: false,
      refetch: mockRefetch
    })
  })

  it('calls mutate and onUpdate with correct values when grading buttons are clicked', () => {
    const onUpdate = vi.fn()
    renderWithProviders(
      <TutorAnswerGrading onUpdate={onUpdate} questionText='Test question' />
    )

    fireEvent.click(screen.getByTestId('CheckIcon'))
    expect(mutateMock).toHaveBeenCalledWith(true)
    expect(onUpdate).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(mutateMock).toHaveBeenCalledWith(false)
    expect(onUpdate).toHaveBeenCalledWith(false)
  })

  it('initializes isCorrect state correctly from finishedQuizzes', () => {
    useQuery.mockReturnValueOnce({
      data: [
        {
          _id: 'attempt1',
          results: [
            {
              question: 'Test question',
              answers: [{ isCorrect: true, isChosen: true }]
            }
          ]
        }
      ],
      isLoading: false,
      refetch: mockRefetch
    })

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)
    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(mutateMock).toHaveBeenCalledWith(false)
  })

  it('does not call onUpdate if questionText is missing', () => {
    const onUpdate = vi.fn()
    renderWithProviders(<TutorAnswerGrading onUpdate={onUpdate} />)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('does not crash if finishedQuizzes is empty', () => {
    useQuery.mockReturnValueOnce({
      data: [],
      isLoading: false,
      refetch: mockRefetch
    })

    expect(() =>
      renderWithProviders(<TutorAnswerGrading questionText='Test question' />)
    ).not.toThrow()
  })

  it('handles mutate error and displays alert', () => {
    const error = new Error('errors.UNKNOWN_ERROR')

    useMutation.mockImplementation(({ onError }) => ({
      mutate: () => onError(error)
    }))

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)
    fireEvent.click(screen.getByTestId('CheckIcon'))

    expect(openAlert).toHaveBeenCalledWith({
      message: getErrorKey(error),
      severity: 'error'
    })
  })

  it('refetches data after successful mutate', async () => {
    let onSuccessFn
    useMutation.mockImplementation(({ onSuccess }) => {
      onSuccessFn = onSuccess
      return { mutate: vi.fn() }
    })

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)
    await onSuccessFn?.()
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('updates results and calls onUpdate when finishedQuiz is found', () => {
    const mockOnUpdate = vi.fn()
    const questionText = 'Sample question'
    const finishedQuizzes = [
      {
        _id: 'quiz123',
        results: [
          {
            question: questionText,
            answers: [
              { text: 'A', isCorrect: false, isChosen: false },
              { text: 'B', isCorrect: false, isChosen: false }
            ]
          }
        ]
      }
    ]

    renderWithProviders(
      <TutorAnswerGrading
        attemptId='quiz123'
        finishedQuizzes={finishedQuizzes}
        newIsCorrect
        onUpdate={mockOnUpdate}
        questionText={questionText}
      />
    )

    fireEvent.click(screen.getByTestId('CheckIcon'))
    expect(mockOnUpdate).toHaveBeenCalledWith(true)
  })
})
