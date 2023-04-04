import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import { axiosClient } from '~/plugins/axiosClient'
import useLoadMore from '~/hooks/use-load-more'

const mockAxiosClient = new MockAdapter(axiosClient)

const mockParams = { limit: 1 }
const mockResponseData = [
  { _id: '1', name: 'test' },
  { _id: '2', name: 'test2' }
]
const mockResponse = { data: mockResponseData }

const mockService = vi.fn((params) => {
  const { limit } = params
  const data = mockResponseData.slice(0, limit)
  return Promise.resolve({ data: data })
})

const props = {
  service: mockService,
  pageSize: mockParams.limit,
  fetchOnMount: true
}

describe('useLoadMore custom hook', () => {
  mockAxiosClient.onAny().reply(200, mockResponse)

  it('should return array with length equal to 1', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLoadMore({ ...props }))

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(mockResponseData.slice(0, mockParams.limit))
  })

  it('should call showMore and return array with length equal to 2', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLoadMore({ ...props }))

    await waitForNextUpdate()

    expect(result.current.data).toEqual(mockResponseData.slice(0, mockParams.limit))
    expect(result.current.loading).toBe(false)

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.data).toEqual(mockResponseData)
  })
})
