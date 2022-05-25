import { act, renderHook } from '@testing-library/react-hooks'
import useAxios from '~/hooks/use-axios'

describe('Use axios custom hook', () => {
  const serviceMock = jest.fn(() => 'test')

  it('should call serviceMock', async() => {
    const { result } = renderHook(() => useAxios({ service: serviceMock, fetchOnMount: false }))

    await act(() => result.current.fetchData())

    expect(serviceMock).toBeCalled()
  })
})