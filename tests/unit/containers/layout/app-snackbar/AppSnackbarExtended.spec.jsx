import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { TestSnackbar } from '~tests/test-utils'
import { vi } from 'vitest'
import { useAppSelector } from '~/hooks/use-redux'

const preloadedState = {
  appMain: { loading: false, authLoading: false, userRole: '', error: '' }
}
const unwrap = vi.fn().mockRejectedValue({ data: { code: 'error' } })
const loginUser = vi.fn().mockReturnValue({ unwrap })

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('~/services/auth-service', async () => {
  return {
    __esModule: true,
    authService: {
      endpoint: { matchFulfilled: vi.fn(), matchPending: vi.fn() }
    },
    useLoginMutation: () => [loginUser]
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppSelector: vi.fn()
  }
})

describe('snackbar with extended', () => {
  beforeEach(async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isOpened: true,
      message: 'Test message; Additional info',
      duration: 3000,
      severity: 'info',
      isExtended: true,
      route: '/test-route'
    })

    renderWithProviders(
      <TestSnackbar>
        <LoginDialog />
      </TestSnackbar>,
      preloadedState
    )
  })

  it('should render extended content when isExtended is true', async () => {
    const mainMessage = await screen.findByText('Test message')
    const additionalInfo = await screen.findByText('Additional info')
    const actionButton = await screen.findByText('offerPage.createOffer.seeAll')

    expect(mainMessage).toBeInTheDocument()
    expect(additionalInfo).toBeInTheDocument()
    expect(actionButton).toBeInTheDocument()
  })
})
