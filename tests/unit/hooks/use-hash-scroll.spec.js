import { act, renderHook } from '@testing-library/react-hooks'
import useHashScroll from '~/hooks/use-hash-scroll'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    hash: '#test'
  })
}))

describe('test useHashScroll custom hook', () => {
  
  it('scrollToAnchor should be function',  () => {
    const { result } = renderHook(() => useHashScroll()) 
    
    expect(typeof result.current.scrollToAnchor).toBe('function')
  })

  it('should scroll to div with id after call scrollToAnchor', () => {
    const elementWithId = document.createElement('div')
    elementWithId.id = 'test'
    document.getElementById = jest.fn().mockImplementation(() => elementWithId)
    const mockedScroll = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockedScroll
    
    const { result } = renderHook(() => useHashScroll())
    act(() => {
      result.current.scrollToAnchor()
    })

    expect(mockedScroll).toBeCalled()
  })
})
