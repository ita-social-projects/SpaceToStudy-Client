import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer from '~/redux/features/snackbarSlice'
import editProfileReducer from '~/redux/features/editProfileSlice'
import socketReducer from '~/redux/features/socketSlice'
import useQuizQuery from '~/hooks/query/use-quiz-query'
import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'

vi.mock('~/hooks/use-query', () => ({
  default: vi.fn()
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    getQuiz: vi.fn()
  }
}))

const store = configureStore({
  reducer: {
    appMain: reducer,
    cooperations: cooperationsReducer,
    snackbar: snackbarReducer,
    editProfile: editProfileReducer,
    socket: socketReducer
  }
})

describe('useQuizQuery', () => {
  const quizId = '123'
  const mockQuizData = { id: quizId, title: 'Sample Quiz' }

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state initially', () => {
    useQuery.mockReturnValue({ data: null, isLoading: true })

    const { result } = renderHook(() => useQuizQuery(quizId), {
      wrapper
    })

    expect(result.current.quiz).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })

  it('should return quiz data when query is successful', () => {
    ResourceService.getQuiz.mockResolvedValue(mockQuizData)
    useQuery.mockReturnValue({ data: mockQuizData, isLoading: false })

    const { result } = renderHook(() => useQuizQuery(quizId), {
      wrapper
    })

    expect(result.current.quiz).toEqual(mockQuizData)
    expect(result.current.isLoading).toBe(false)
  })
})
