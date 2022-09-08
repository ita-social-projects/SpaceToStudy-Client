import { screen, fireEvent, waitFor } from '@testing-library/react'
import useAxios from '~/hooks/use-axios'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'

jest.mock('~/hooks/use-axios')

const setModal = jest.fn()
const resetToken = 'test'

describe('ResetPassword test', () => {
  it('should open login dilog after positive response', async () => {
    const mockData = {
      response: { response: { status: 204 } },
      error: null,
      loading: false,
      fetchData: jest.fn()
    }
    useAxios.mockImplementation((options) => {
      options.service()
      return mockData
    })

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword resetToken={ resetToken } setModal={ setModal } />
      </SnackBarProvider>
    )

    const passwordInput = screen.getByLabelText(/common.labels.password/i)
    const confirmPasswordInput = screen.getByLabelText(/common.labels.confirmPassword/i)
    const button = screen.getByText('login.savePassword')

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })

    await waitFor(() => {
      fireEvent.click(button)
    })

    expect(setModal).toHaveBeenCalled()
  })

  it('should open snackbar with error after reject', async () => {
    const mockData = {
      response: null,
      error: { response: { data: { code: 'BAD_RESET_TOKEN' } } },
      loading: false,
      fetchData: jest.fn()
    }
    useAxios.mockImplementation(() => mockData)

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword resetToken={ resetToken } setModal={ setModal } />
      </SnackBarProvider>
    )

    const passwordInput = screen.getByLabelText(/common.labels.password/i)
    const confirmPasswordInput = screen.getByLabelText(/common.labels.confirmPassword/i)
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
