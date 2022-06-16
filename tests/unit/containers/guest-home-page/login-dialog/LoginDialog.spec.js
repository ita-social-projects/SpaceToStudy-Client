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
    const img = screen.getByAltText(/login/i)
    
    expect(img).toBeInTheDocument()
  })
    
  it('should render head text', () => {
    const text = screen.getByText(/login.head/i)
    
    expect(text).toBeInTheDocument()
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
