import { screen, render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { constants } from '~/constants/common'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('Signup dialog', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignupDialog type={ constants.student } />
      </BrowserRouter>
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
    const inputEmail = screen.getByLabelText(/signup.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })

    expect(inputEmail.value).toBe('test@mail.com')
  })

  it('should change password value', () => {
    const inputPassword = screen.getByLabelText(/signup.password/i)
    fireEvent.change(inputPassword, { target: { value: 'test' } })

    expect(inputPassword.value).toBe('test')
  })

  it('should show error', () => {
    const button = screen.getByText('signup.signupButton')
    fireEvent.click(button)
    const error = screen.getByText('signup.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })
})
