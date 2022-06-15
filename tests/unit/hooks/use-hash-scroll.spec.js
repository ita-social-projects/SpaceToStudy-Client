import { act, renderHook } from '@testing-library/react-hooks'
import { screen, render } from '@testing-library/react'
import useHashScroll from '~/hooks/use-hash-scroll'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    hash: '#test'
  })
}))
const App = () => {
  useHashScroll()
  return(
    <div>
      <div></div>
      <div id='test'></div>
    </div>
  )
}
const mockedScroll = jest.fn()
window.HTMLElement.prototype.scrollIntoView = mockedScroll

describe('test useHashScroll custom hook', () => {

  it('scrollToAnchor should be function',  () => {
    const { result } = renderHook(() => useHashScroll())

    expect(typeof result.current.scrollToAnchor).toBe('function')
  })

  it('should scroll to div with id after call scrollToAnchor', () => {
    render(<App />)
    const { result } = renderHook(() => useHashScroll())
    act(() => {
      result.current.scrollToAnchor()
    })

    expect(mockedScroll).toBeCalled()
  })
})
