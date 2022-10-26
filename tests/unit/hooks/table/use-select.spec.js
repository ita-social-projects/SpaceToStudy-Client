import { act, renderHook } from '@testing-library/react-hooks'
import { TableProvider } from '~/context/table-context'
import useSelect from '~/hooks/table/use-select'
import { getFakeTestEvent } from '~tests/test-utils'

describe('Use select custom hook', () => {
  const wrapper = ({ children }) => (<TableProvider>
    { children }
  </TableProvider>)

  const items = [
    { _id: 1, value: 1 },
    { _id: 2, value: 2 },
    { _id: 3, value: 3 }
  ]

  let result

  beforeEach(() => {
    result = renderHook(() => useSelect(), {
      wrapper
    }).result
  })

  it('should select all', () => {
    act(() => {
      const event = getFakeTestEvent('checked', true)
      result.current.createSelectAllHandler(items)(event)
    })

    expect(result.current.selected).toEqual([1, 2, 3])
  })

  it('should clear all selected', () => {
    act(() => {
      const event = getFakeTestEvent('checked', false)
      result.current.createSelectAllHandler(items)(event)
    })

    expect(result.current.selected).toEqual([])
  })

  it('should select item', () => {
    let isSelected

    act(() => {
      result.current.handleSelectClick(null, 1)
    })

    expect(result.current.selected).toEqual([1])

    act(() => {
      isSelected = result.current.isSelected(1)
    })

    expect(isSelected).toBeTruthy()

    act(() => {
      result.current.handleSelectClick(null, 1)
    })

    expect(result.current.selected).toEqual([])
  })
})
