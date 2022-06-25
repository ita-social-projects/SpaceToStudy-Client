import { store } from '~/redux/store'
import reducer, { logout } from '~/redux/reducer'
import { loginUser } from '~/redux/action-creators'
import { request } from '~/plugins/request'
import MockAdapter from 'axios-mock-adapter'

import { URLs } from '~/constants/request'
import { errorMessage, initialState, stateWithUserData, tokken, userData } from './redux.variables'

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => tokken,
    setItem: () => ''
  }
})

const mock = new MockAdapter(request)

describe('redux test', () => {
  it('should return the initial state', () => {

    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should set an error to store', async () => {
    mock.onPost(URLs.user.login).reply(401, new Error(errorMessage))
    await store.dispatch(loginUser(userData))

    expect(store.getState()).toEqual({ appMain: { ...initialState, error: errorMessage } })
  })

  it('should set user data to store', async () => {
    mock.onPost(URLs.user.login).reply(200, tokken)
    await store.dispatch(loginUser(userData))

    expect(store.getState()).toEqual({ appMain: stateWithUserData })
  })

  it('should clear user data from store', () => {

    expect(reducer(stateWithUserData, logout())).toEqual(initialState)
  })
})
