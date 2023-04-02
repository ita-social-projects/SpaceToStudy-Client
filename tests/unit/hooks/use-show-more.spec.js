import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import { axiosClient } from '~/plugins/axiosClient'
import useShowMore from '~/hooks/use-show-more'

const mockAxiosClient = new MockAdapter(axiosClient)

const mockParams = { limit: 1 }
const mockResponseData = [
  { _id: '1', name: 'test' },
  { _id: '2', name: 'test2' }
]
const mockResponse = { data: mockResponseData }

const mockService = vi.fn((params) => {
  const { limit } = params
  const responseData = mockResponseData.slice(0, limit)
  return Promise.resolve({ data: responseData })
})

const props = {
  service: mockService,
  pageSize: mockParams.limit,
  fetchOnMount: true
}

describe('useShowMore custom hook', () => {
  mockAxiosClient.onAny().reply(200, mockResponse)

  it('should return array with length equal to 1', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useShowMore({ ...props }))

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.responseData).toEqual(mockResponseData.slice(0, mockParams.limit))
  })

  it('should call showMore and return array with length equal to 2', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useShowMore({ ...props }))

    await waitForNextUpdate()

    expect(result.current.responseData).toEqual(mockResponseData.slice(0, mockParams.limit))
    expect(result.current.loading).toBe(false)

    act(() => {
      result.current.showMore()
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.responseData).toEqual(mockResponseData)
  })
})
