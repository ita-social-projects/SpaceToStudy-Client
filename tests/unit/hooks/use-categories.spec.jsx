import { vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import useCategories from '~/hooks/use-categories'
import { categoryService } from '~/services/category-service'

vi.mock('axios')
vi.mock('~/services/category-service')

const mockCategories = [
  { _id: '1', name: 'Category 1', description: 'Description 1' },
  { _id: '2', name: 'Category 2', description: 'Description 2' }
]

const mockError = { status: 404, code: 'NOT_FOUND', message: 'The requested URL was not found.' }

describe('useCategories', () => {
  it('fetches categories successfully', async () => {
    categoryService.getCategories.mockResolvedValueOnce({ data: mockCategories })

    const params = { page: 1, limit: 10 }
    const { result, waitForNextUpdate } = renderHook(() => useCategories({ params }))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(categoryService.getCategories).toHaveBeenCalledWith(params)

    expect(result.current.loading).toBe(false)
    expect(result.current.responseItems).toEqual(mockCategories)
  })

  it('handles API errors', async () => {
    categoryService.getCategories.mockRejectedValueOnce(mockError)

    const params = { page: 1, limit: 10 }
    const { result, waitForNextUpdate } = renderHook(() => useCategories({ params }))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(categoryService.getCategories).toHaveBeenCalledWith(params)

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toEqual(mockError)
  })
})
