import { screen, fireEvent, waitFor } from '@testing-library/react'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import { ModalProvider } from '~/context/modal-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

const mockAxiosClient = new MockAdapter(axiosClient)

describe('ForgotPassword test', () => {
  beforeEach(async () => {
    renderWithProviders(
      <SnackBarProvider>
        <ModalProvider>
          <ForgotPassword />
        </ModalProvider>
      </SnackBarProvider>
    )
  })

  it('should render title', () => {
    const title = screen.getByText('login.forgotPassword')

    expect(title).toBeInTheDocument()
  })

  it('should show error after submit with empty input', () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.focusOut(inputEmail)

    const error = screen.getByText('common.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })

  it('should click back to login and open login dialog', async () => {
    const backBtn = screen.getByText('login.backToLogin')
    fireEvent.click(backBtn)
    const img = screen.queryByAltText(/login/i)

    await waitFor(() => expect(img).toBeInTheDocument())
  })

  it('should submit form and open info popup', async () => {
    mockAxiosClient.onPost(URLs.auth.forgotPassword).reply(204)

    const input = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(input, { target: { value: 'test@gmail.com' } })

    const button = screen.getByText('login.sendPassword')
    fireEvent.click(button)
    const resetPasswordTitle = await screen.findByText('login.passwordReset')

    await waitFor(() => expect(resetPasswordTitle).toBeInTheDocument())
  })

  it('should show error snackbar', async () => {
    mockAxiosClient.onPost(URLs.auth.forgotPassword).reply(404, { code: 'EMAIL_NOT_FOUND' })

    const input = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(input, { target: { value: 'error@gmail.com' } })

    const button = screen.getByText('login.sendPassword')
    fireEvent.click(button)
    const error = await screen.findByText('errors.EMAIL_NOT_FOUND')

    await waitFor(() => expect(error).toBeInTheDocument())
  })
})
