import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import TutorAnswerGrading from '~/containers/quiz/quiz-question/TutorAnswerGrading'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { URLs } from '~/constants/request'

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

vi.mock('~/redux/features/snackbarSlice', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

describe('TutorAnswerGrading', () => {
  const mockQuizId = 'quiz1'
  const mockCooperationId = 'coop1'

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
    mockAxiosClient.resetHandlers()

    mockAxiosClient
      .onGet(
        URLs.finishedQuizzes.getByQuizId
          .replace(':cooperationId', mockCooperationId)
          .replace(':quizId', mockQuizId)
      )
      .reply(200, mockFinishedQuizzes)

    mockAxiosClient
      .onPatch(URLs.finishedQuizzes.patch.replace(':id', 'attempt1'))
      .reply(200)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls onUpdate with correct values when buttons clicked', async () => {
    const onUpdate = vi.fn()
    renderWithProviders(
      <TutorAnswerGrading onUpdate={onUpdate} questionText='Test question' />
    )

    await waitFor(() =>
      expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
    )

    fireEvent.click(screen.getByTestId('CheckIcon'))
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(true)
    })

    fireEvent.click(screen.getByTestId('CloseIcon'))
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(false)
    })
  })

  it('does not crash if finishedQuizzes is empty', async () => {
    mockAxiosClient.resetHandlers()
    mockAxiosClient
      .onGet(
        URLs.finishedQuizzes.getByQuizId
          .replace(':cooperationId', mockCooperationId)
          .replace(':quizId', mockQuizId)
      )
      .reply(200, [])

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)

    await waitFor(() =>
      expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
    )
  })

  it('handles error on PATCH and displays alert', async () => {
    mockAxiosClient.resetHandlers()

    mockAxiosClient
      .onGet(
        URLs.finishedQuizzes.getByQuizId
          .replace(':cooperationId', mockCooperationId)
          .replace(':quizId', mockQuizId)
      )
      .reply(200, mockFinishedQuizzes)

    mockAxiosClient
      .onPatch(URLs.finishedQuizzes.patch.replace(':id', 'attempt1'))
      .reply(500)

    renderWithProviders(<TutorAnswerGrading questionText='Test question' />)

    await waitFor(() =>
      expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
    )

    fireEvent.click(screen.getByTestId('CheckIcon'))

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledWith({
        message: getErrorKey(new Error('errors.UNKNOWN_ERROR')),
        severity: 'error'
      })
    })
  })

  it('does not call onUpdate if questionText is missing', async () => {
    const onUpdate = vi.fn()
    renderWithProviders(<TutorAnswerGrading onUpdate={onUpdate} />)

    await waitFor(() =>
      expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
    )
    expect(onUpdate).not.toHaveBeenCalled()
  })
})
