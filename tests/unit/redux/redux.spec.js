import { afterEach, vi } from 'vitest'

import { store } from '~/redux/store'
import reducer, {
  logout,
  checkAuth,
  loginUser,
  logoutUser,
  signupUser
} from '~/redux/reducer'
import { mockAxiosClient } from '~tests/test-utils'

import { URLs } from '~/constants/request'
import {
  errorMessage,
  initialState,
  accessToken,
  loginUserData,
  signupUserData,
  stateAfterSignup,
  stateAfterLogin,
  errorCode
} from './redux.variables'

vi.mock('~/services/local-storage-service', () => ({
  __esModule: true,
  getFromLocalStorage: () => true,
  setToLocalStorage: () => true,
  removeFromLocalStorage: () => true
}))

const error = new Error(errorMessage)
error.code = errorCode

describe('redux test', () => {
  afterEach(() => vi.clearAllMocks())
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set an error to store after signup', async () => {
    mockAxiosClient.onPost(URLs.auth.signup).reply(404, error)
    await store.dispatch(signupUser(signupUserData))

    expect(store.getState()).toEqual({
      appMain: { ...stateAfterSignup, error: errorCode }
    })
  })

  it('should set an error to store after login', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(404, error)
    await store.dispatch(loginUser(loginUserData))

    expect(store.getState()).toEqual({
      appMain: { ...stateAfterSignup, error: errorCode }
    })
  })

  it('should set user data to store after login', async () => {
    mockAxiosClient.onPost(URLs.auth.login).reply(200, { accessToken })
    await store.dispatch(loginUser(loginUserData))

    expect(store.getState()).toEqual({ appMain: stateAfterLogin })
  })
  it('should set an error to store after checkAuth', async () => {
    mockAxiosClient.onGet(URLs.auth.refresh).reply(404, error)
    await store.dispatch(checkAuth())

    expect(store.getState()).toEqual({
      appMain: { ...stateAfterLogin, error: errorCode }
    })
  })

  it('should set user data to store after checkAuth', async () => {
    mockAxiosClient.onGet(URLs.auth.refresh).reply(200, { accessToken })
    await store.dispatch(checkAuth())

    expect(store.getState()).toEqual({
      appMain: { ...stateAfterLogin }
    })
  })

  it('should set an error to store after logout', async () => {
    mockAxiosClient.onPost(URLs.auth.logout).reply(404, error)
    await store.dispatch(logoutUser())

    expect(store.getState()).toEqual({
      appMain: { ...stateAfterLogin, error: errorCode }
    })
  })

  it('should remove user data from store after logout', async () => {
    mockAxiosClient
      .onPost(URLs.auth.logout)
      .reply(200, { count: 'deletedCount: 1' })
    await store.dispatch(logoutUser())

    expect(store.getState()).toEqual({
      appMain: stateAfterSignup
    })
  })

  it('should clear user data from store', () => {
    expect(reducer(stateAfterLogin, logout())).toEqual(stateAfterSignup)
  })
})
