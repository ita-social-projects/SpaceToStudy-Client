import { afterEach, vi } from 'vitest'

import { store } from '~/redux/store'
import reducer, { logout, checkAuth } from '~/redux/reducer'
import { mockAxiosClient } from '~tests/test-utils'

import { URLs } from '~/constants/request'
import {
  errorMessage,
  initialState,
  accessToken,
  stateAfterSignup,
  stateAfterLogin,
  errorCode
} from './redux.variables'

const error = new Error(errorMessage)
error.code = errorCode

describe('redux test', () => {
  afterEach(() => vi.clearAllMocks())
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set an error to store after checkAuth', async () => {
    mockAxiosClient.onGet(URLs.auth.refresh).reply(404, error)
    await store.dispatch(checkAuth())

    expect(store.getState().appMain).toEqual({
      ...stateAfterSignup,
      error: errorCode
    })
  })

  it('should set user data to store after checkAuth', async () => {
    mockAxiosClient.onGet(URLs.auth.refresh).reply(200, { accessToken })
    await store.dispatch(checkAuth())

    expect(store.getState().appMain).toEqual({ ...stateAfterLogin })
  })

  it('should clear user data from store', () => {
    expect(reducer(stateAfterLogin, logout())).toEqual(stateAfterSignup)
  })
})
