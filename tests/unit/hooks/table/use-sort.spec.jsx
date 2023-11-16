import { act, renderHook } from '@testing-library/react'

import useSort from '~/hooks/table/use-sort'

describe('Use sort custom hook', () => {
  it('should change sort order to desc', () => {
    const initialSort = { order: 'asc', orderBy: 'email' }

    const { result } = renderHook(() => useSort({ initialSort }))

    act(() => result.current.onRequestSort('email'))

    expect(result.current.sort.order).toEqual('desc')
  })

  it('should change sort order to asc', () => {
    const initialSort = { order: 'desc', orderBy: 'email' }

    const { result } = renderHook(() => useSort({ initialSort }))

    act(() => result.current.onRequestSort('email'))

    expect(result.current.sort.order).toEqual('asc')
  })
})
