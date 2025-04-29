import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TutorAnswerGrading from '~/containers/quiz/quiz-question/TutorAnswerGrading'
import { renderWithProviders } from '~tests/test-utils'
import { useMutation, useQuery } from '@tanstack/react-query'

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

vi.mock('~/redux/features/snackbarSlice', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

describe('TutorAnswerGrading', () => {
  const mutateMock = vi.fn()
  const mockRefetch = vi.fn()

  const mockFinishedQuizzes = [
    {
      _id: 'attempt1',
      results: [
        {
          question: 'Test question',
          answers: [{ isCorrect: false, isChosen: true }]
        }
      ]
    }
  ]

  beforeEach(() => {
    useMutation.mockReturnValue({
      mutate: mutateMock,
      onError: vi.fn(),
      onSuccess: vi.fn()
    })

    useQuery.mockReturnValue({
      data: mockFinishedQuizzes,
      isLoading: false,
      refetch: mockRefetch
    })
  })

  it('calls onUpdate with correct values when buttons clicked', () => {
    const onUpdate = vi.fn()
    renderWithProviders(
      <TutorAnswerGrading onUpdate={onUpdate} questionText='Test question' />
    )

    fireEvent.click(screen.getByTestId('CheckIcon'))
    expect(onUpdate).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(onUpdate).toHaveBeenCalledWith(false)
  })

  it('calls mutate with correct values when buttons clicked', () => {
    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)

    fireEvent.click(screen.getByTestId('CheckIcon'))
    expect(mutateMock).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(mutateMock).toHaveBeenCalledWith(false)
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

  it('handles mutate error case correctly', () => {
    const mutateErrorMock = vi.fn().mockRejectedValue(new Error('Test error'))
    useMutation.mockReturnValueOnce({
      mutate: mutateErrorMock,
      onError: vi.fn(),
      onSuccess: vi.fn()
    })

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)

    fireEvent.click(screen.getByTestId('CheckIcon'))
    expect(mutateErrorMock).toHaveBeenCalledWith(true)
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
})
