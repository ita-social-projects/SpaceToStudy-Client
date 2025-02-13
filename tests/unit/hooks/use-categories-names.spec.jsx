import { afterEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import { baseService } from '~/services/base-service'
import QueryProvider from '~/QueryProvider'
import { queryClient } from '~/plugins/queryClient'

vi.mock('~/services/category-service')
vi.mock('~/services/base-service')

const mockCategoriesNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

const mockError = {
  status: 404,
  code: 'NOT_FOUND',
  message: 'The requested URL was not found.'
}

describe('useCategoriesNames', () => {
  afterEach(() => {
    queryClient.clear()
  })

  it('fetches categories names successfully', async () => {
    categoryService.getCategoriesNames.mockResolvedValueOnce(
      mockCategoriesNames
    )

    const { result } = renderHook(() => useCategoriesNames(), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.response).toEqual([])

    expect(categoryService.getCategoriesNames).toHaveBeenCalled()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockCategoriesNames)
    })
  })

  it('handles API errors', async () => {
    baseService.request.mockRejectedValueOnce({ response: { data: mockError } })

    const { result } = renderHook(() => useCategoriesNames(), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.response).toEqual([])

    expect(categoryService.getCategoriesNames).toHaveBeenCalled()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).not.toEqual([])
    })
  })
})
