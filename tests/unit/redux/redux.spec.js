import MockAdapter from 'axios-mock-adapter'

import { store } from '~/redux/store'
import reducer, { logout, checkAuth, loginUser, logoutUser, signupUser } from '~/redux/reducer'
import { axiosClient } from '~/plugins/axiosClient'
import { axiosInstance } from '~/services/auth-service'
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '~/services/local-storage-service'

import { URLs } from '~/constants/request'
import {
  errorMessage,
  initialState,
  accessToken,
  loginUserData,
  signupUserData,
  userEmail,
  stateAfterSignup,
  stateAfterLogin
} from './redux.variables'

jest.mock('~/services/local-storage-service')

getFromLocalStorage.mockImplementation(() => accessToken)
removeFromLocalStorage.mockImplementation(jest.fn())
setToLocalStorage.mockImplementation(jest.fn())

const mockAxiosClient = new MockAdapter(axiosClient)

const mockAxiosInstance = new MockAdapter(axiosInstance)

describe('redux test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set an error to store after signup', async () => {
    mockAxiosClient.onPost(URLs.auth.signup).reply(404, new Error(errorMessage))
    await store.dispatch(signupUser(signupUserData))

    expect(store.getState()).toEqual({ appMain: { ...initialState, error: errorMessage } })
  })

  it('should set user email to store after signup', async () => {
    mockAxiosClient.onPost(URLs.auth.signup).reply(200, { userEmail })
    await store.dispatch(signupUser(signupUserData))

    expect(store.getState()).toEqual({ appMain: stateAfterSignup })
  })

  it('should set an error to store after login', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(404, new Error(errorMessage))
    await store.dispatch(loginUser(loginUserData))

    expect(store.getState()).toEqual({ appMain: { ...stateAfterSignup, error: errorMessage } })
  })

  it('should set user data to store after login', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(200, { accessToken })
    await store.dispatch(loginUser(loginUserData))

    expect(store.getState()).toEqual({ appMain: stateAfterLogin })
  })

  it('should set an error to store after checkAuth', async () => {
    mockAxiosInstance.onGet(URLs.auth.refresh).reply(404, new Error(errorMessage))
    await store.dispatch(checkAuth())

    expect(store.getState()).toEqual({ appMain: { ...stateAfterLogin, error: errorMessage } })
  })

  it('should set user data to store after checkAuth', async () => {
    mockAxiosInstance.onGet(URLs.auth.refresh).reply(200, { accessToken })
    await store.dispatch(checkAuth())

    expect(store.getState()).toEqual({ appMain: stateAfterLogin })
  })

  it('should set an error to store after logout', async () => {
    mockAxiosClient.onPost(URLs.auth.logout).reply(404, new Error(errorMessage))
    await store.dispatch(logoutUser())

    expect(store.getState()).toEqual({ appMain: { ...stateAfterLogin, error: errorMessage } })
  })

  it('should remove user data from store after logout', async () => {
    mockAxiosClient.onPost(URLs.auth.logout).reply(200, { count: 'deletedCount: 1' })
    await store.dispatch(logoutUser())

    const { isFirstLogin, ...expectedState } = initialState
    expect(store.getState()).toEqual({ appMain: expectedState })
  })

  it('should clear user data from store', () => {
    expect(reducer(stateAfterLogin, logout())).toEqual(initialState)
  })
})
