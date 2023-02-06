import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from '~/services/local-storage-service'
import { vi } from 'vitest'

describe('Local storage service test', () => {
  it('should return null from local storage', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: {
        getItem: () => null,
        setItem: vi.fn()
      }
    })

    const token = getFromLocalStorage('token')
    expect(token).toBe(null)
  })

  it('should set item if local storage is empty', () => {
    setToLocalStorage('accessToken', 'token')
    expect(window.localStorage.setItem).toBeCalled()
  })

  it('should not remove item from local storage', () => {
    removeFromLocalStorage('accessToken')

    expect(window.localStorage.setItem).not.toBeUndefined()
  })

  it('should return item from local storage', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: {
        getItem: () =>
          JSON.stringify({
            accessToken: 'token'
          }),
        setItem: vi.fn()
      }
    })

    const token = getFromLocalStorage('accessToken')
    expect(token).toBe('token')
  })

  it('should set item to local storage', () => {
    setToLocalStorage('accessToken', 'token')
    expect(window.localStorage.setItem).toBeCalled()
  })

  it('should remove item from local storage', () => {
    removeFromLocalStorage('accessToken')
    expect(window.localStorage.setItem).toBeCalled()
  })
})
