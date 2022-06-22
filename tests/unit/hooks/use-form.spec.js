import { act, renderHook } from '@testing-library/react-hooks'
import useForm from '~/hooks/use-form'

const onSubmit = jest.fn()
const initialValues = { email: '' }
const getFakeTestEvent = (value) =>  ({ preventDefault: jest.fn(), target: { value }, })

describe('useForm custom hook test without errors', () => {

  it('should have initial values', () => {
    const validations = { email: jest.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    expect(typeof result.current.handleChange).toBe('function')
    expect(typeof result.current.handleBlur).toBe('function')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(result.current.data).toEqual({ email: '' })
    expect(result.current.errors).toEqual({})
    expect(result.current.isDirty).toEqual(false)
  })

  it('should change data value', () => {
    const validations = { email: jest.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleChange('email')(getFakeTestEvent('test')))

    expect(result.current.data).toEqual({ email: 'test' })
    expect(result.current.errors).toEqual({})
  })
  
  it('should blur after change', () => {
    const validations = { email: jest.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleChange('email')(getFakeTestEvent('test')))
    act(() => result.current.handleBlur('email')(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: undefined })
    expect(result.current.isDirty).toEqual(true)
  })

  it('should submit', () => {
    const validations = { email: jest.fn(() => undefined) }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleSubmit(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: undefined })
    expect(onSubmit).toBeCalled()
  })
})

describe('useForm custom hook test with errors', () => {

  it('should change with validation after blur', () => {
    const validations = { email: jest.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    act(() => result.current.handleBlur('email')(getFakeTestEvent()))
    act(() => result.current.handleChange('email')(getFakeTestEvent('test')))

    expect(result.current.data).toEqual({ email: 'test' })
    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
  })

  it('should handle blur', () => {
    const validations = { email: jest.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleBlur('email')(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
  })

  it('should validate and not submit', () => {
    const validations = { email: jest.fn(() => 'error') }
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleSubmit(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(result.current.errors).toEqual({ email: 'error' })
    expect(onSubmit).not.toBeCalled()
  })
})
