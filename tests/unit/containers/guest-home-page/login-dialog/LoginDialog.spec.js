import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})
jest.mock('~/hooks/use-prompt', () => {
  return () => ({
    setPrompt: () => true
  })
})

describe('Login form', () => {
  beforeEach(() => {
    render(
      <LoginDialog />
    )
  })
    
  it('should render img', () => {
    const input = screen.getByAltText(/login/i)
    
    expect(input).toBeInTheDocument()
  })
    
  it('should render head', () => {
    const input = screen.getByText(/login.head/i)
    
    expect(input).toBeInTheDocument()
  })
    
  it('should change email value', () => {
    const inputEmail = screen.getByLabelText(/email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })
      
    expect(inputEmail.value).toBe('test@mail.com')
  })
    
  it('should change password value', () => {
    const inputPassword = screen.getByLabelText(/login.password/i) 
    fireEvent.change(inputPassword, { target: { value: 'test' } })
      
    expect(inputPassword.value).toBe('test')
  })
    
  it('should show error',  () => {
    const button = screen.getByText('login.loginButton')
    fireEvent.click(button)  
    const error = screen.getByText('login.errorMessages.emailValid')
    
    expect(error).toBeInTheDocument()
  })
})
