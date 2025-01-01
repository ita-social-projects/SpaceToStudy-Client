import { describe, expect, it } from 'vitest'
import { ResponseError } from '~/exceptions'
import { baseService } from '~/services/base-service'
import { mockAxiosClient } from '~tests/test-utils'

const TEST_URL = '/some-url'

const SUCCESSFUL_RESPONSE_DATA = {
  count: 0,
  items: []
}

const SERVER_ERROR_RESPONSE_DATA = {
  code: 'BAD_REQUEST',
  message:
    'The request could not be processed due to invalid or missing parameters.',
  status: 400
}

const UNKNOWN_ERROR = {
  code: 'UNKNOWN_ERROR',
  message: 'UNKNOWN_ERROR_MESSAGE'
}

describe('baseService tests', () => {
  it('should return parsed response data on a successful request', async () => {
    mockAxiosClient.onGet(TEST_URL).reply(200, SUCCESSFUL_RESPONSE_DATA)

    const data = await baseService.request({ method: 'GET', url: TEST_URL })

    expect(data).toEqual(SUCCESSFUL_RESPONSE_DATA)
  })

  it('should throw a ResponseError on a response with a failed request', async () => {
    mockAxiosClient.onGet(TEST_URL).reply(400, SERVER_ERROR_RESPONSE_DATA)

    try {
      await baseService.request({ method: 'GET', url: TEST_URL })
    } catch (error) {
      expect(error).toBeInstanceOf(ResponseError)

      expect(error.message).toBe(SERVER_ERROR_RESPONSE_DATA.message)
      expect(error.code).toBe(SERVER_ERROR_RESPONSE_DATA.code)
      expect(error.status).toBe(SERVER_ERROR_RESPONSE_DATA.status)
    }
  })

  it('should throw an unknown ResponseError on a non-axios error', async () => {
    mockAxiosClient.onGet(TEST_URL).networkError()

    try {
      await baseService.request({ method: 'GET', url: TEST_URL })
    } catch (error) {
      expect(error).toBeInstanceOf(ResponseError)

      expect(error.message).toBe(UNKNOWN_ERROR.message)
      expect(error.code).toBe(UNKNOWN_ERROR.code)
      expect(error.status).toBe(undefined)
    }
  })
})
