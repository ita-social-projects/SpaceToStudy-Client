import { act, renderHook } from '@testing-library/react-hooks'
import useForm from '~/hooks/use-form'
import { getFakeTestEvent } from '~tests/test-utils'
import { vi } from 'vitest'

const onSubmit = vi.fn()
const initialValues = { email: '' }

describe('useForm custom hook test without errors', () => {
  it('should have initial values', () => {
    const validations = { email: vi.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    expect(typeof result.current.handleChange).toBe('function')
    expect(typeof result.current.handleBlur).toBe('function')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(result.current.data).toEqual({ email: '' })
    expect(result.current.errors).toEqual({})
    expect(result.current.isDirty).toEqual(false)
  })

  it('should change data value', () => {
    const validations = { email: vi.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    act(() => result.current.handleChange('email')(getFakeTestEvent('value', 'test')))

    expect(result.current.data).toEqual({ email: 'test' })
    expect(result.current.errors).toEqual({})
  })

  it('should blur after change with dirty true', () => {
    const validations = { email: vi.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    act(() => result.current.handleChange('email')(getFakeTestEvent('value', 'test')))
    act(() => result.current.handleBlur('email')(getFakeTestEvent('value')))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: undefined })
    expect(result.current.isDirty).toEqual(true)
  })

  it('should submit', async () => {
    const validations = { email: vi.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    await act(() => result.current.handleSubmit(getFakeTestEvent('value')))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: undefined })
    expect(onSubmit).toBeCalled()
  })
})

describe('useForm custom hook test with errors', () => {
  it('should change with validation after blur', () => {
    const validations = { email: vi.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    act(() => result.current.handleBlur('email')(getFakeTestEvent('value')))
    act(() => result.current.handleChange('email')(getFakeTestEvent('value', 'test')))

    expect(result.current.data).toEqual({ email: 'test' })
    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
  })

  it('should handle blur', () => {
    const validations = { email: vi.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    act(() => result.current.handleBlur('email')(getFakeTestEvent('value')))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
  })

  it('should validate and not submit', async () => {
    const validations = { email: vi.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    await act(() => result.current.handleSubmit(getFakeTestEvent('value')))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
    expect(onSubmit).not.toBeCalled()
  })
})
