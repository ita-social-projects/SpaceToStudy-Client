import { screen, fireEvent, waitFor } from '@testing-library/react'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import { URLs } from '~/constants/request'

const openModal = vi.fn()
const resetToken = 'test'
const error = new Error()
error.code = 'BAD_RESET_TOKEN'

describe('ResetPassword test', () => {
  it('should open login dialog after positive response', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
      .reply(200)

    renderWithProviders(
      <TestSnackbar>
        <ResetPassword openModal={openModal} resetToken={resetToken} />
      </TestSnackbar>
    )

    const passwordInput = screen.getByLabelText(/common.labels.password/i)
    const confirmPasswordInput = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    const button = screen.getByText('login.savePassword')

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })

    await waitFor(() => {
      fireEvent.click(button)
    })

    expect(openModal).toHaveBeenCalled()
  })

  it('should open snackbar with error after reject', async () => {
    await waitFor(() => {
      mockAxiosClient
        .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
        .reply(404, error)

      renderWithProviders(
        <TestSnackbar>
          <ResetPassword resetToken={resetToken} setModal={openModal} />
        </TestSnackbar>
      )
    })

    const passwordInput = screen.getByLabelText(/common.labels.password/i)
    const confirmPasswordInput = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    const button = screen.getByText('login.savePassword')

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })
    fireEvent.click(button)

    const snackbar = await screen.findByText('errors.BAD_RESET_TOKEN')

    expect(snackbar).toBeInTheDocument()
  })
})
