import { screen, fireEvent, waitFor } from '@testing-library/react'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'
import MockAdapter from 'axios-mock-adapter'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { vi } from 'vitest'

const mockAxiosClient = new MockAdapter(axiosClient)
const openModal = vi.fn()
const resetToken = 'test'
const error = new Error()
error.code = 'BAD_RESET_TOKEN'

describe('ResetPassword test', () => {
  it('should open login dilog after positive response', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
      .reply(200)

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword openModal={openModal} resetToken={resetToken} />
      </SnackBarProvider>
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
    mockAxiosClient
      .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
      .reply(404, error)

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword resetToken={resetToken} setModal={openModal} />
      </SnackBarProvider>
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

    const snackbar = screen.getByText('errors.BAD_RESET_TOKEN')

    expect(snackbar).toBeInTheDocument()
  })
})
