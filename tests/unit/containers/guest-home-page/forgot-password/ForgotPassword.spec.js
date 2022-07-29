import { screen, fireEvent, waitFor } from '@testing-library/react'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('ForgotPassword test', () => {
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <ForgotPassword />
      </ModalProvider>
    )
  })

  it('should render title', () => {
    const title = screen.getByText('login.forgotPassword')

    expect(title).toBeInTheDocument()
  })

  it('should show error after submit with empty input', () => {
    const button = screen.getByText('login.sendPassword')
    fireEvent.click(button)
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
    const input = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(input, { target: { value: 'test@gmail.com' } })

    const button = screen.getByText('login.sendPassword')
    fireEvent.click(button)
    const resetPasswordTitle = screen.getByText('login.passwordReset')

    expect(resetPasswordTitle).toBeInTheDocument()
  })
})
