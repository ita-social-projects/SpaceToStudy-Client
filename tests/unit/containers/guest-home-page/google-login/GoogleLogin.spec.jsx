import { screen, fireEvent, waitFor } from '@testing-library/react'

import { SnackBarProvider } from '~/context/snackbar-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { ModalProvider } from '~/context/modal-context'
import { login, signup } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const mockCloseModal = vi.fn()
const mockGoogle = { accounts: { id: { initialize: jest.fn(), renderButton: jest.fn() } } }

const originalGoogle = global.google
const buttonWidth = { xs: '300px', md: '400px' }

describe('GoogleLogin component test for login', () => {
  beforeAll(() => {
    global.google = mockGoogle
  })
  afterAll(() => {
    global.google = originalGoogle
  })
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ModalProvider value={ { closeModal: mockCloseModal } }>
          <GoogleLogin buttonWidth={ buttonWidth } type={ login } />
        </ModalProvider>
      </SnackBarProvider>
    )
  })

  it('should have "or continue" text', () => {
    const text = screen.getByText('login.continue')

    expect(text).toBeInTheDocument()
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
  beforeAll(() => {
    global.google = mockGoogle
  })
  afterAll(() => {
    global.google = originalGoogle
  })

  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <GoogleLogin buttonWidth={ buttonWidth } type={ signup } />
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
