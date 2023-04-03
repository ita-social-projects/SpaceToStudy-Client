import { vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

const mockCategoriesNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

const mockError = { status: 404, code: 'NOT_FOUND', message: 'The requested URL was not found.' }

describe('useCategoriesNames', () => {
  it('fetches categories names successfully', async () => {
    categoryService.getCategoriesNames.mockResolvedValueOnce({ data: mockCategoriesNames })

    const { result, waitForNextUpdate } = renderHook(() => useCategoriesNames({}))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(categoryService.getCategoriesNames).toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.responseItems).toEqual(mockCategoriesNames)
  })

  it('handles API errors', async () => {
    categoryService.getCategoriesNames.mockRejectedValueOnce(mockError )

    const { result, waitForNextUpdate } = renderHook(() => useCategoriesNames({}))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(categoryService.getCategoriesNames).toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toEqual(mockError)
  })
})
