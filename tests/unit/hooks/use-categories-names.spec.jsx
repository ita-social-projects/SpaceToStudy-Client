import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

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
  it('fetches categories names successfully', async () => {
    categoryService.getCategoriesNames.mockResolvedValueOnce({
      data: mockCategoriesNames
    })

    const { result } = renderHook(() => useCategoriesNames())

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    waitFor(() => {
      expect(categoryService.getCategoriesNames).toHaveBeenCalled()

      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockCategoriesNames)
    })
  })

  it('handles API errors', async () => {
    categoryService.getCategoriesNames.mockRejectedValueOnce({
      response: { data: mockError }
    })

    const { result } = renderHook(() => useCategoriesNames())

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    waitFor(() => {
      expect(categoryService.getCategoriesNames).toHaveBeenCalled()

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(mockError)
    })
  })
})
