import { renderHook, act, waitFor } from '@testing-library/react'
import { mockAxiosClient } from '~tests/test-utils'
import useLoadMore from '~/hooks/use-load-more'
import QueryProvider from '~/QueryProvider'

const mockParams = { limit: 1 }
const mockResponseData = [
  { _id: '1', name: 'test' },
  { _id: '2', name: 'test2' }
]

const mockResponse = { items: mockResponseData, count: mockResponseData.length }

const mockService = vi.fn((params) => {
  const { limit, skip } = params
  const data = mockResponseData.slice(skip, limit + skip)
  return Promise.resolve({
    items: data,
    count: data.length
  })
})

const props = {
  service: mockService,
  limit: mockParams.limit
}

describe('useLoadMore custom hook', () => {
  mockAxiosClient.onAny().reply(200, mockResponse)

  it('should return array with length equal to 1', async () => {
    const { result } = renderHook(() => useLoadMore({ ...props }), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(true)

    waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(
        mockResponseData.slice(0, mockParams.limit)
      )
    })
  })
  it('should call showMore and return array with length equal to 2', async () => {
    const { result } = renderHook(() => useLoadMore({ ...props }), {
      wrapper: QueryProvider
    })

    waitFor(() => {
      expect(result.current.data).toEqual(
        mockResponseData.slice(0, mockParams.limit)
      )
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.loading).toBe(true)

    waitFor(() => {
      expect(result.current.data).toEqual(mockResponseData)
    })
  })

  it('should call resetData and return empty data', async () => {
    const { result } = renderHook(() => useLoadMore({ ...props }), {
      wrapper: QueryProvider
    })

    waitFor(() => {
      expect(result.current.data).toEqual(
        mockResponseData.slice(0, mockParams.limit)
      )
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.resetData()
    })

    expect(result.current.data).toEqual([])
  })
})
