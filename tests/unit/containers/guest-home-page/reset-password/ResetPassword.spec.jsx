import { screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import * as useMutation from '~/hooks/use-mutation'
import { URLs } from '~/constants/request'

const openModal = vi.fn()
const resetToken = 'test'

describe('ResetPassword test', () => {
  it('should open login dialog after positive response', async () => {
    mockAxiosClient
      .onPatch(URLs.auth.resetPassword.replace(':token', resetToken))
      .reply(204, null)

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

    fireEvent.click(button)

    await waitFor(() => expect(openModal).toHaveBeenCalled())
  })

  it('should open snackbar with error after reject', async () => {
    mockAxiosClient
      .onPatch(URLs.auth.resetPassword.replace(':token', resetToken))
      .reply(404, { code: 'BAD_RESET_TOKEN' })

    renderWithProviders(
      <TestSnackbar>
        <ResetPassword resetToken={resetToken} setModal={openModal} />
      </TestSnackbar>
    )

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

  it('should call the mutate function and render the loader inside the button after submitting a new password', async () => {
    const useMutationSpy = vi.spyOn(useMutation, 'default')
    const mutateFunction = vi.fn()

    useMutationSpy.mockReturnValue({
      isPending: false,
      mutate: mutateFunction
    })

    const { rerender } = renderWithProviders(
      <TestSnackbar>
        <ResetPassword resetToken={resetToken} setModal={openModal} />
      </TestSnackbar>
    )

    const passwordInput = screen.getByLabelText(/common.labels.password/i)
    const confirmPasswordInput = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    const button = screen.getByText('login.savePassword')

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })
    fireEvent.click(button)

    expect(mutateFunction).toHaveBeenCalledWith('12345qwertY')

    useMutationSpy.mockReturnValue({
      isPending: true
    })
    rerender(<ResetPassword resetToken={resetToken} setModal={openModal} />)

    const loader = await screen.findByTestId('loader')
    expect(loader).toBeInTheDocument()
  })
})
