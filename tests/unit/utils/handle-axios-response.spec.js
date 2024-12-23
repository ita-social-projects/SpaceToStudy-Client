import { test, expect, vi } from 'vitest'

import { handleAxiosResponse } from '~/utils/handle-axios-response'

test('should return data when the response status is between 200 and 299', async () => {
  const mockData = { message: 'Success' }
  const mockResponse = {
    data: mockData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  }

  const mockPromise = vi.fn(() => Promise.resolve(mockResponse))

  const result = await handleAxiosResponse(mockPromise())
  expect(result).toEqual(mockData)
})

test('should throw an error when the response status is not between 200 and 299', async () => {
  const errorMessage = 'Error occurred'
  const errorResponse = { message: errorMessage }
  const mockResponse = {
    data: errorResponse,
    status: 500,
    statusText: 'Internal Server Error',
    headers: {},
    config: {}
  }

  const mockPromise = vi.fn(() => Promise.resolve(mockResponse))

  await expect(handleAxiosResponse(mockPromise())).rejects.toThrow(errorMessage)
})
