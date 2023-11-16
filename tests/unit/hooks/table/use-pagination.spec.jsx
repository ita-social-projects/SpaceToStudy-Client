import { act, renderHook } from '@testing-library/react'

import usePagination from '~/hooks/table/use-pagination'
import { getFakeTestEvent } from '~tests/test-utils'

describe('Use pagination custom hook', () => {
  let result

  beforeEach(() => {
    const { result: renderedHookResult } = renderHook(() => usePagination())
    result = renderedHookResult
  })

  it('should change page', () => {
    act(() => {
      result.current.handleChangePage(null, 5)
    })

    expect(result.current.page).toEqual(5)
  })

  it('should return checked page as 1', () => {
    const { result } = renderHook(() =>
      usePagination({ defaultPage: 0, itemsPerPage: 5, itemsCount: 10 })
    )

    expect(result.current.page).toEqual(1)
  })

  it('should return checked page as 2', () => {
    const { result } = renderHook(() =>
      usePagination({ defaultPage: 15, itemsPerPage: 5, itemsCount: 10 })
    )

    expect(result.current.page).toEqual(15)
  })

  it('should clear page', () => {
    act(() => {
      result.current.clearPage()
    })

    expect(result.current.page).toEqual(1)
  })

  it('should change page input', () => {
    act(() => {
      const event = getFakeTestEvent('value', 2)
      result.current.handleChangePageInput(event)
    })

    expect(result.current.pageInput).toEqual(2)
  })

  it('should change rows per page', () => {
    act(() => {
      const event = getFakeTestEvent('value', 10)
      result.current.handleChangeRowsPerPage(event)
    })

    expect(result.current.rowsPerPage).toEqual(10)
  })

  it('should change page by pagination controller', () => {
    act(() => {
      result.current.handleChangePage(null, 5)
    })

    expect(result.current.page).toEqual(5)
  })

  it('should submit page', () => {
    act(() => {
      const event = getFakeTestEvent('value', 3)
      result.current.handleChangePageInput(event)
    })

    act(() => {
      result.current.handlePageSubmit(5)
    })

    expect(result.current.page).toEqual(3)
  })

  it('should set page to maxPages if page input is greater than maxPages', () => {
    act(() => {
      const event = getFakeTestEvent('value', 6)
      result.current.handleChangePageInput(event)
    })

    act(() => {
      result.current.handlePageSubmit(5)
    })

    expect(result.current.page).toEqual(5)
    expect(result.current.pageInput).toEqual(5)
  })

  it('should set page to 1 if page input is smaller than 1', () => {
    act(() => {
      const event = getFakeTestEvent('value', 0)
      result.current.handleChangePageInput(event)
    })

    act(() => {
      result.current.handlePageSubmit(5)
    })

    expect(result.current.page).toEqual(1)
    expect(result.current.pageInput).toEqual(1)
  })
})
