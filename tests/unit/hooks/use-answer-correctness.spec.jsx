import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useAnswerCorrectness } from '~/hooks/use-answer-correctness'
import { checkAnswerCorrectness } from '~/utils/is-correct-answer'
import { getFirstAnswer } from '~/utils/get-first-answer'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { ResourceService } from '~/services/resource-service'
import QueryProvider from '~/QueryProvider'

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    getFinishedQuiz: vi.fn()
  }
}))

vi.mock('~/utils/is-correct-answer', () => ({
  checkAnswerCorrectness: vi.fn()
}))

vi.mock('~/utils/get-first-answer', () => ({
  getFirstAnswer: vi.fn()
}))

vi.mock('~/components/question-editor/QuestionEditor.constants', () => ({
  determineQuestionType: vi.fn()
}))

describe('useAnswerCorrectness', () => {
  const attemptId = 'test-attempt-id'
  const question = {
    text: 'What is the most popular js library?',
    type: 'text'
  }

  const wrapper = ({ children }) => <QueryProvider>{children}</QueryProvider>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return isAnswerCorrect for non-open question using checkAnswerCorrectness', async () => {
    determineQuestionType.mockReturnValue({
      isOpenAnswer: false
    })
    checkAnswerCorrectness.mockReturnValue(true)

    const { result } = renderHook(
      () => useAnswerCorrectness(attemptId, question, 'React'),
      { wrapper }
    )

    expect(result.current.isOpenAnswer).toBe(false)
    expect(result.current.isAnswerCorrect).toBe(true)
  })

  it('should return isAnswerCorrect from getFirstAnswer for open question', async () => {
    determineQuestionType.mockReturnValue({
      isOpenAnswer: true
    })

    const finishedQuiz = {
      results: [
        {
          question: 'What is the most popular js library?',
          isCorrect: true
        }
      ]
    }

    ResourceService.getFinishedQuiz.mockResolvedValue(finishedQuiz)
    getFirstAnswer.mockReturnValue({
      isCorrect: true
    })

    const { result } = renderHook(
      () => useAnswerCorrectness(attemptId, question, 'maybe react'),
      { wrapper }
    )

    await waitFor(() => {
      expect(result.current.isOpenAnswer).toBe(true)
      expect(result.current.isAnswerCorrect).toBe(true)
    })
  })
})
