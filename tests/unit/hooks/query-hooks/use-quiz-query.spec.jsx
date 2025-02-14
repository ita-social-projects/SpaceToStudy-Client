import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import useQuizQuery from '~/hooks/query-hooks/use-quiz-query'
import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'

vi.mock('~/hooks/use-query', () => ({
  default: vi.fn()
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    getQuizQuery: vi.fn()
  }
}))

describe('useQuizQuery', () => {
  const quizId = '123'
  const mockQuizData = { id: quizId, title: 'Sample Quiz' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return quiz data when query is successful', async () => {
    ResourceService.getQuizQuery.mockResolvedValue(mockQuizData)
    useQuery.mockReturnValue({ data: mockQuizData, isLoading: false })

    const { result } = renderHook(() => useQuizQuery(quizId))

    expect(result.current.quiz).toEqual(mockQuizData)
    expect(result.current.isLoading).toBe(false)
  })

  it('should return loading state initially', async () => {
    useQuery.mockReturnValue({ data: null, isLoading: true })

    const { result } = renderHook(() => useQuizQuery(quizId))

    expect(result.current.quiz).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })
})
