import { renderHook, act } from '@testing-library/react-hooks'

import useShowMore from '~/hooks/use-show-more'

const setLimitMock = vi.fn()

const props = {
  limit: 1,
  increaseCount: 2,
  setLimit: setLimitMock,
  loading: false,
  response: {
    data: [
      { _id: '1', name: 'test' },
      { _id: '2', name: 'test2' }
    ]
  }
}

describe('useShowMore custom hook', () => {
  it('should call setLimit', () => {
    const { result } = renderHook(() => useShowMore({ ...props }))

    act(() => {
      result.current.showMore()
    })

    expect(setLimitMock).toHaveBeenCalled()
  })

  it('should return call show more and change isExpandable to true', () => {
    const { result } = renderHook(() => useShowMore({ ...props }))

    act(() => {
      result.current.showMore()
    })

    expect(result.current.isExpandable).toBeTruthy()
  })
})
