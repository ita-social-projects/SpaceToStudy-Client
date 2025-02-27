import { afterEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import QueryProvider from '~/QueryProvider'
import { queryClient } from '~/plugins/queryClient'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

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
    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, mockCategoriesNames)

    const getCategoriesNamesSpy = vi.spyOn(
      categoryService,
      'getCategoriesNames'
    )

    const { result } = renderHook(() => useCategoriesNames(), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    expect(getCategoriesNamesSpy).toHaveBeenCalled()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockCategoriesNames)
    })
  })

  it('handles API errors', async () => {
    mockAxiosClient.onGet(URLs.categories.getNames).reply(400, mockError)

    const getCategoriesNamesSpy = vi.spyOn(
      categoryService,
      'getCategoriesNames'
    )

    const { result } = renderHook(() => useCategoriesNames(), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    expect(getCategoriesNamesSpy).toHaveBeenCalled()

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false)
        expect(result.current.error.message).toEqual(mockError.message)
      },
      { timeout: 8000 }
    )
  }, 8000)
})
