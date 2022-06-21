import { act, renderHook } from '@testing-library/react-hooks'
import useForm from '~/hooks/use-form'

const onSubmit = jest.fn()
const initialValues = { email: '' }
const validations = { email: jest.fn() }

const getFakeTestEvent = (value) =>  ({ preventDefault: jest.fn(), target: { value }, })

describe('useForm custom hook', () => {
  
  it('should have initial values', () => {
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))

    expect(typeof result.current.handleChange).toBe('function')
    expect(typeof result.current.handleBlur).toBe('function')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(result.current.data).toEqual({ email: '' })
    expect(result.current.errors).toEqual({})
    expect(result.current.isDirty).toEqual(false)
  })

  it('should handle changes', () => {
    const { result } = renderHook(() => useForm({ initialValues, validations, onSubmit }))
    
    act(() => result.current.handleChange('email')(getFakeTestEvent('test')))

    expect(result.current.data).toEqual({ email: 'test' })

    act(() => result.current.handleBlur('email')(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(result.current.isDirty).toEqual(true)
   
    act(() => result.current.handleSubmit(getFakeTestEvent()))

    expect(validations.email).toBeCalled()
    expect(onSubmit).toBeCalled()
  })
})
