import { renderHook } from '@testing-library/react'
import useInputVisibility from '~/hooks/use-input-visibility'

describe('Use input visibility custom hook', () => {
  it('should use input visibility', () => {
    const { result } = renderHook(() => useInputVisibility('error'))

    expect(result.current.showInputText).toBe(false)
    expect(typeof result.current.inputVisibility).toBe('object')
  })
})
