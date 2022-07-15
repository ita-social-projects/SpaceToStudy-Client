import { renderHook, act } from '@testing-library/react-hooks'

import useShowMore from '~/hooks/use-show-more'
import { allItemsMock } from '~tests/unit/hooks/use-show-more/all-items-mock'

describe('useShowMore custom hook', () => {
  it('should do expand items by value from step', () => {
    const { result } = renderHook(() => useShowMore(allItemsMock, 2, 2))

    act(() => {
      result.current.showMore()
    })

    expect(result.current.items.length).toBe(4)
  })

  it('should assign expandable value to false, if there is no more items to show', () => {
    const { result } = renderHook(() => useShowMore(allItemsMock, 3, 2))

    act(() => {
      result.current.showMore()
    })

    expect(result.current.expandable).toBeFalsy()
  })
})
