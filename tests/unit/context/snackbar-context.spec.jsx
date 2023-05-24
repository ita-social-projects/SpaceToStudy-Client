import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const preloadedState = { appMain: { loading: false, userRole: '', error: '' } }

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('snackbar context', () => {
  beforeEach(async () => {
    renderWithProviders(<LoginDialog />, { preloadedState })

    mockAxiosClient.onPost(URLs.auth.login).reply(404, { code: 'error' })
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const button = screen.getByText('common.labels.login')
    fireEvent.click(button)
    const snackbar = await screen.findByText('errors.error')

    await waitFor(() => expect(snackbar).toBeInTheDocument())
  })

  it('should close snackbar on blur', async () => {
    const snackbar = screen.getByText('errors.error')
    const title = screen.getByText('login.head')

    fireEvent.click(title)

    await waitFor(() => expect(snackbar).not.toBeInTheDocument())
  })
})
