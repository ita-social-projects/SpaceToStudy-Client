import { screen, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { student } from '~/containers/guest-home-page/constants'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('Signup dialog test', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignupDialog type={ student } />
      </MemoryRouter>
    )
  })

  it('should render img', () => {
    const img = screen.getByAltText(/signup/i)

    expect(img).toBeInTheDocument()
  })

  it('should render head', () => {
    const head = screen.getByRole('heading', { level: 2 })

    expect(head).toBeInTheDocument()
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
    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)
    const error = screen.getByText('common.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })

  it('should dispatch after button submit', async () => {
    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)
    fireEvent.change(inputFirstName, { target: { value: 'test' } })

    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)
    fireEvent.change(inputLastName, { target: { value: 'test' } })

    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const inputConfirmPassword = screen.getByLabelText(/common.labels.confirmPassword/i)
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678a/A' } })

    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
