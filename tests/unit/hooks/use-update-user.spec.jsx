import { renderHook, act, waitFor } from '@testing-library/react'
import reducer from '~/redux/reducer'
import snackbarReducer, { openAlert } from '~/redux/features/snackbarSlice'
import useUpdateUser from '~/hooks/use-update-user'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import PopupsProvider from '~/PopupsProvider'
import { snackbarVariants } from '~/constants'
import { vi } from 'vitest'

const mockUpdateUser = vi.fn()
const mockNavigate = vi.fn()
const mockDispatch = vi.fn()

vi.mock('~/services/user-service', () => ({
  userService: {
    updateUser: () => mockUpdateUser()
  }
}))

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate
}))

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

const mockError = {
  code: 'mockError'
}

const mockState = {
  appMain: { userId: 'mock-user-id' }
}

const store = configureStore({
  reducer: {
    appMain: reducer,
    snackbar: snackbarReducer
  },
  preloadedState: mockState
})

const wrapper = ({ children }) => (
  <Provider store={store}>
    <PopupsProvider>{children}</PopupsProvider>
  </Provider>
)

describe('useUpdateUser custom hook', () => {
  const userId = 'mock-user-id'
  const data = { firstName: 'Test User' }

  beforeEach(() => {
    mockNavigate.mockReset()
    mockDispatch.mockReset()
  })

  it('should call updateUser', async () => {
    mockUpdateUser.mockReturnValue({ data })

    const { result } = renderHook(() => useUpdateUser(userId), { wrapper })

    act(() => {
      result.current.handleSubmit(data)
    })

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled()
    })
  })

  it('should refresh if shouldRefreshAfterResponse is true', async () => {
    const { result } = renderHook(() => useUpdateUser(userId, true), {
      wrapper
    })

    act(() => {
      result.current.handleSubmit(data)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(0)
    })
  })

  it('should not refresh if shouldRefreshAfterResponse is false', async () => {
    const { result } = renderHook(() => useUpdateUser(userId, false), {
      wrapper
    })

    act(() => {
      result.current.handleSubmit(data)
    })

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith(0)
    })
  })

  it('should dispatch openAlert with success message', async () => {
    mockUpdateUser.mockReturnValue({ data })

    const { result } = renderHook(() => useUpdateUser(userId), {
      wrapper
    })

    act(() => {
      result.current.handleSubmit(data)
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'editProfilePage.profile.successMessage'
        })
      )
    })
  })

  it('should dispatch openAlert with error message', async () => {
    mockUpdateUser.mockRejectedValue({
      response: { data: mockError }
    })

    const { result } = renderHook(() => useUpdateUser(userId), {
      wrapper
    })

    act(() => {
      result.current.handleSubmit(data)
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.error,
          message: 'errors.mockError'
        })
      )
    })
  })
})
