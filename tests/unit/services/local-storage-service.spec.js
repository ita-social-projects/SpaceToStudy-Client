import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage
} from '~/services/local-storage-service'
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
    setToLocalStorage('testItem', 'test')

    expect(window.localStorage.setItem).toBeCalled()
  })

  it('should not remove item from local storage', () => {
    removeFromLocalStorage('testItem')

    expect(window.localStorage.setItem).not.toBeUndefined()
  })

  it('should return item from local storage', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: {
        getItem: () =>
          JSON.stringify({
            testItem: 'test'
          }),
        setItem: vi.fn()
      }
    })

    const item = getFromLocalStorage('testItem')

    expect(item).toBe('test')
  })

  it('should set item to local storage', () => {
    setToLocalStorage('testItem', 'test')

    expect(window.localStorage.setItem).toBeCalled()
  })

  it('should remove item from local storage', () => {
    removeFromLocalStorage('testItem')

    expect(window.localStorage.setItem).toBeCalled()
  })
})
