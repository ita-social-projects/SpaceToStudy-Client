import { screen, fireEvent, waitFor } from '@testing-library/react'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

const preloadedState = { appMain: { loading: false, userRole: '', error: '' } }
const mockAxiosClient = new MockAdapter(axiosClient)

describe('snackbar context', () => {
  beforeEach(async () => {
    renderWithProviders(
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <LoginDialog />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>,
      { preloadedState }
    )

    mockAxiosClient.onPost(URLs.auth.login).reply(404, { code: 'error' })
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const button = screen.getByText('common.labels.login')
    await waitFor(() => fireEvent.click(button))
  })

  it('should open snackbar', () => {
    const snackbar = screen.getByText('errors.error')

    expect(snackbar).toBeInTheDocument()
  })

  it('should close snackbar on blur', async () => {
    const snackbar = screen.getByText('errors.error')
    const title = screen.getByText('login.head')

    fireEvent.click(title)

    await waitFor(() => expect(snackbar).not.toBeInTheDocument())
  })
})
