import { renderHook, act } from '@testing-library/react'
import useAccordions from '~/hooks/use-accordions'

describe('UseAccordions tests', () => {
  it('Should have initial state', () => {
    const { result } = renderHook(() => useAccordions({ initialState: 1 }))

    const accordionState = result.current[0]
    expect(accordionState).toBe(1)
  })

  it('Should expand accordion while closing previous expanded', () => {
    const { result } = renderHook(() => useAccordions({ initialState: 1 }))

    act(() => {
      const expandAccordion = result.current[1]
      expandAccordion(5)
    })

    const accordionState = result.current[0]
    expect(accordionState).toBe(5)
  })

  it('Should toggle specified accordion', () => {
    const { result } = renderHook(() => useAccordions({ initialState: 2 }))

    act(() => {
      const expandAccordion = result.current[1]
      expandAccordion(2)
    })

    const accordionState = result.current[0]
    expect(accordionState).toBe(null)
  })

  it('Should not toggle specified accordion', () => {
    const { result } = renderHook(() =>
      useAccordions({ initialState: 2, toggle: false })
    )

    act(() => {
      const expandAccordion = result.current[1]
      expandAccordion(2)
    })

    const accordionState = result.current[0]
    expect(accordionState).toBe(2)
  })

  it('Should expand one more accordion', () => {
    const { result } = renderHook(() =>
      useAccordions({ initialState: [5, 8], multiple: true })
    )

    act(() => {
      const expandAccordion = result.current[1]
      expandAccordion(9)
    })

    const accordionState = result.current[0]
    expect(accordionState).toEqual([5, 8, 9])
  })

  it('Should hide specified accordion', () => {
    const { result } = renderHook(() =>
      useAccordions({ initialState: [5, 8], multiple: true })
    )

    act(() => {
      const expandAccordion = result.current[1]
      expandAccordion(5)
    })

    const accordionState = result.current[0]
    expect(accordionState).toEqual([8])
  })
})
