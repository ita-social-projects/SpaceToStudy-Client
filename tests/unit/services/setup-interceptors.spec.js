import MockAdapter from 'axios-mock-adapter'
import { accessToken } from '~/constants'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { store } from '~/redux/store'
import { axiosInstance } from '~/services/auth-service'
import { setupInterceptors } from '~/services/setup-interceptors'
import { removeFromLocalStorage, setToLocalStorage } from '~/services/local-storage-service'

const mockAccessToken = 'test'
const loginUserData = { email: 'user@gmail.com', password: '123' }

jest.mock('~/services/local-storage-service', () => ({
  getFromLocalStorage: () => mockAccessToken,
  removeFromLocalStorage: jest.fn(),
  setToLocalStorage: jest.fn()
}))

const mockAxiosClient = new MockAdapter(axiosClient)
const mockAxiosInstance = new MockAdapter(axiosInstance)

describe('axios interceptors test', () => {
  setupInterceptors(store)
  it('1', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(200, {})
    const res = await axiosClient.post(URLs.auth.login, loginUserData)

    expect(res.config.headers.authorization).toEqual(`Bearer ${mockAccessToken}`)
  })

  it('2', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(401)
    mockAxiosInstance.onGet(URLs.auth.refresh).reply(200, { accessToken: mockAccessToken })
    try {
      await axiosClient.post(URLs.auth.login, loginUserData)
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(setToLocalStorage).toHaveBeenCalledWith(accessToken, mockAccessToken)
    }
  })

  it('3', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(401)
    mockAxiosInstance.onGet(URLs.auth.refresh).reply(401)
    mockAxiosClient.onPost(URLs.auth.logout).reply(200)
    try {
      await axiosClient.post(URLs.auth.login, loginUserData)
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(removeFromLocalStorage).toHaveBeenCalledWith(accessToken)
    }
  })
})
