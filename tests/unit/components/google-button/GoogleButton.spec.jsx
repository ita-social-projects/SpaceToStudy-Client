import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import GoogleButton from '~/containers/guest-home-page/google-button/GoogleButton'
import { renderWithProviders } from '~tests/test-utils'
import { snackbarVariants } from '~/constants'
import { getErrorKey } from '~/utils/get-error-key'

const mockCloseModal = vi.fn()
const mockDispatch = vi.fn()
const mockGoogleAuth = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: mockCloseModal
    })
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useGoogleAuthMutation: () => [mockGoogleAuth]
  }
})

const mockGoogle = {
  accounts: { id: { initialize: vi.fn(), renderButton: vi.fn() } }
}

const originalGoogle = global.google
const buttonWidth = { xs: '300px', md: '400px' }
const type = 'login'
const route = '/some-route'

describe('GoogleButton component test', () => {
  const role = 'user'

  beforeAll(() => {
    global.google = mockGoogle
  })

  afterAll(() => {
    global.google = originalGoogle
  })

  beforeEach(() => {
    renderWithProviders(
      <GoogleButton
        buttonWidth={buttonWidth}
        role={role}
        route={route}
        type={type}
      />
    )
  })

  it('should render GoogleButton', () => {
    const googleButton = document.querySelector('#googleButton')
    expect(googleButton).toBeInTheDocument()
  })

  it('should close modal on successful Auth response', async () => {
    const token = 'valid_token'
    const unwrapMock = vi.fn().mockResolvedValueOnce({})
    mockGoogleAuth.mockReturnValue({ unwrap: unwrapMock })

    await waitFor(() =>
      expect(mockGoogle.accounts.id.initialize).toHaveBeenCalled()
    )
    await waitFor(() =>
      expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalled()
    )

    const { callback } = mockGoogle.accounts.id.initialize.mock.calls[0][0]
    await callback(token)

    await waitFor(() =>
      expect(mockGoogleAuth).toHaveBeenCalledWith({ token, role })
    )
    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })

  it('should handle google auth error and user not found', async () => {
    const invalidToken = 'invalid_token'
    const error = {
      data: { code: 'USER_NOT_FOUND', message: 'User not found' }
    }

    const unwrapMock = vi.fn().mockRejectedValueOnce(error)
    mockGoogleAuth.mockReturnValue({ unwrap: unwrapMock })

    await waitFor(() =>
      expect(mockGoogle.accounts.id.initialize).toHaveBeenCalled()
    )
    await waitFor(() =>
      expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalled()
    )

    const { callback } = mockGoogle.accounts.id.initialize.mock.calls[0][0]
    await callback(invalidToken)

    await waitFor(() =>
      expect(mockGoogleAuth).toHaveBeenCalledWith({ token: invalidToken, role })
    )
    await waitFor(() => expect(unwrapMock).toHaveBeenCalled())
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'snackbarSlice/openAlert',
        payload: {
          severity: snackbarVariants.error,
          message: getErrorKey(error.data)
        }
      })
    )
    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
})
