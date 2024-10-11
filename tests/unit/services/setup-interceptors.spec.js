import { vi } from 'vitest'

import { setupInterceptors } from '~/services/setup-interceptors'
import { mockAxiosClient } from '~tests/test-utils'
import { axiosClient } from '~/plugins/axiosClient'
import { authRoutes } from '~/router/constants/authRoutes'

const navigateMock = vi.fn()
const dispatchMock = vi.fn()

vi.mock('~/plugins/i18n', () => {
  return {
    default: { language: 'en' }
  }
})

vi.mock('~/redux/store', () => {
  return {
    store: { dispatch: (params) => dispatchMock(params) }
  }
})

vi.mock('~/router/router', () => {
  return {
    router: { navigate: (params) => navigateMock(params) }
  }
})

const testUrl = '/test'

const unauthorizedError = {
  code: 'UNAUTHORIZED',
  message: 'Unauthorized message',
  status: 401
}

const okResponse = {
  code: 'OK',
  status: 200
}

describe('setupInterceptors tests', () => {
  beforeAll(() => {
    setupInterceptors()
  })

  it('should return error if the code in response data is not UNAUTHORIZED', async () => {
    const badRequestError = {
      code: 'BAD_REQUEST',
      message: 'bad request message',
      status: 400
    }
    mockAxiosClient.onGet(testUrl).reply(400, badRequestError)

    try {
      await axiosClient.get(testUrl)
    } catch (error) {
      expect(error.response.data).toEqual(badRequestError)
    }
  })

  it('should should navigate to the logout path if tokens were not refreshed', async () => {
    mockAxiosClient.onGet(testUrl).reply(401, unauthorizedError)

    try {
      await axiosClient.get(testUrl)
    } catch (error) {
      expect(navigateMock).toHaveBeenCalledWith(
        authRoutes.accountMenu.logout.path
      )
      expect(error.response.data).toEqual(unauthorizedError)
    }
  })

  it('should return response if tokens were refreshed', async () => {
    mockAxiosClient
      .onGet(testUrl)
      .replyOnce(401, unauthorizedError)
      .onGet(testUrl)
      .reply(200, okResponse)

    const response = await axiosClient.get(testUrl)

    expect(dispatchMock).toHaveBeenCalled()
    expect(response.data).toEqual(okResponse)
  })
})
