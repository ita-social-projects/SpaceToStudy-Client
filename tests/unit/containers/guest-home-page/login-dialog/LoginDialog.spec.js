import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { ModalProvider } from '~/context/modal-context'
import { SnackBarProvider } from '~/context/snackbar-context'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch.mockReturnValue({ unwrap: () => '' })
}))

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('Login dialog test', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SnackBarProvider>
          <ModalProvider>
            <LoginDialog />
          </ModalProvider>
        </SnackBarProvider>
      </MemoryRouter>
    )
  })

  it('should render img', () => {
    const img = screen.getByAltText(/login/i)

    expect(img).toBeInTheDocument()
  })

  it('should render head text', () => {
    const text = screen.getByText(/login.head/i)

    expect(text).toBeInTheDocument()
  })

  it('should change email value', () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })

    expect(inputEmail.value).toBe('test@mail.com')
  })

  it('should change password value', () => {
    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: 'test' } })

    expect(inputPassword.value).toBe('test')
  })

  it('should show error', () => {
    const button = screen.getByText('common.labels.login')
    fireEvent.click(button)
    const error = screen.getByText('common.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })

  it('should dispatch after button submit', async () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const button = screen.getByText('common.labels.login')
    fireEvent.click(button)

    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
})
