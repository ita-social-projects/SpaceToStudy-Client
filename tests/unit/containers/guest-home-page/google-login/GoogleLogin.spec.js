import { screen, fireEvent, waitFor } from '@testing-library/react'

import { SnackBarProvider } from '~/context/snackbar-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { ModalProvider } from '~/context/modal-context'
import { login, signup } from '~/containers/guest-home-page/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { renderWithProviders } from '~tests/test-utils'

const mockCloseModal = jest.fn()

describe('GoogleLogin component test for login', () => {
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider value={ { closeModal: mockCloseModal } }>
        <GoogleLogin type={ login } />
      </ModalProvider>
    )
  })

  it('should have "or continue" text', () => {
    const text = screen.getByText('login.continue')

    expect(text).toBeInTheDocument()
  })

  it('should have google logo', () => {
    const logo = screen.getByAltText('google icon')

    expect(logo).toBeInTheDocument()
  })
  it('should have button with "Login with Google" text', () => {
    const button = screen.getByText('login.googleButton')

    expect(button).toBeInTheDocument()
  })

  it('should have "have account" text', () => {
    const text = screen.getByText('login.haveAccount')

    expect(text).toBeInTheDocument()
  })

  it('should have "Join us" text', () => {
    const text = screen.getByText('login.joinUs')

    expect(text).toBeInTheDocument()
  })

  it('should close login modal after click', async () => {
    const link = screen.getByText('login.joinUs')
    fireEvent.click(link)

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
})

describe('GoogleLogin component test for signup', () => {
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <GoogleLogin type={ signup } />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    )
  })

  it('should render login popup', async () => {
    const link = screen.getByText('signup.joinUs')
    fireEvent.click(link)
    const popup = await screen.findByTestId('popup')

    expect(popup).toBeInTheDocument()
  })
})
