import { act, renderHook, waitFor } from '@testing-library/react'
import useChangeUserStatus from '~/hooks/use-change-user-status'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer from '~/redux/features/snackbarSlice'
import { Provider } from 'react-redux'
import PopupsProvider from '~/PopupsProvider'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ checkConfirmation: () => true })
  }
})

const mockActivateUser = vi.fn()
const mockDeactivateUser = vi.fn()

vi.mock('~/services/user-service', () => ({
  userService: {
    activateUser: () => mockActivateUser(),
    deactivateUser: () => mockDeactivateUser()
  }
}))

const mockError = {
  status: 404,
  code: 'NOT_FOUND',
  message: 'The requested URL was not found.'
}

const mockState = {
  appMain: { userId: '660a64bfdcc6320599f8c0f0', userStatus: 'deactivated' }
}

const store = configureStore({
  reducer: {
    appMain: reducer,
    cooperations: cooperationsReducer,
    snackbar: snackbarReducer
  },
  preloadedState: mockState
})

const wrapper = ({ children }) => (
  <Provider store={store}>
    <PopupsProvider>{children}</PopupsProvider>
  </Provider>
)

describe('useChangeUserStatus custom hook', () => {
  it('should throw an error and not change the status', async () => {
    const mockSetItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(vi.fn())

    mockActivateUser.mockRejectedValue({
      response: { data: mockError }
    })

    const { result } = renderHook(() => useChangeUserStatus(), { wrapper })

    act(() => {
      result.current.checkStatusChange('title', 'message')
    })

    await waitFor(() => {
      expect(result.current.neededAction).toBe('activate')
    })

    mockSetItem.mockRestore()
  })

  it('should activate and activate a user account', async () => {
    mockActivateUser.mockReturnValue({
      data: {}
    })
    mockDeactivateUser.mockReturnValue({
      data: {}
    })

    const { result } = renderHook(() => useChangeUserStatus(), { wrapper })

    act(() => {
      result.current.checkStatusChange('title', 'message')
    })

    await waitFor(() => {
      expect(mockActivateUser).toHaveBeenCalled()
      expect(result.current.neededAction).toBe('deactivate')
    })

    act(() => {
      result.current.checkStatusChange('title', 'message', true)
    })

    await waitFor(() => {
      expect(mockDeactivateUser).toHaveBeenCalled()
      expect(result.current.neededAction).toBe('activate')
    })
  })
})
