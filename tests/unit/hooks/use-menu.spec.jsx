import { act, renderHook } from '@testing-library/react'
import useMenu from '~/hooks/use-menu'

describe('Use menu custom hook', () => {
  let result
  const fakeEvent = { currentTarget: {} }
  const menuItems = [1, 2, 3]

  beforeEach(() => {
    result = renderHook(() => useMenu()).result
  })

  it('should open menu', () => {
    act(() => result.current.openMenu(fakeEvent))

    expect(result.current.anchorEl).toEqual({})
  })

  it('should close menu', () => {
    act(() => result.current.closeMenu())

    expect(result.current.anchorEl).toEqual(null)
  })

  it('should render menu', () => {
    act(() => {
      result.current.renderMenu(menuItems)
    })

    expect(typeof result.current.renderMenu).toBe('function')
  })
})
