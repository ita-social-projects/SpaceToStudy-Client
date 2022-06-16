import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'

const errors = { email: false, password: false }
const data= { email: 'email@mail.com', password: 'passTest1' }
const handleChange = jest.fn()
const handleBlur = jest.fn()
const handleSubmit = jest.fn()

describe('Login form', () => {
  beforeEach(() => {
    render(
      <LoginForm
        data={ data }
        errors={ errors }
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
    )
  })
    
  it('should render email input label', () => {
    const inputLabel = screen.getByLabelText(/email/i)
    
    expect(inputLabel).toBeInTheDocument()
  })
    
  it('should render password input label', () => {
    const inputLabel = screen.getByText('login.password')
      
    expect(inputLabel).toBeInTheDocument()
  })
    
  it('should render checkbox label', () => {
    const label = screen.getByText('login.rememberMe')
      
    expect(label).toBeInTheDocument()
  })
    
  it('should render forgot password text', () => {
    const text = screen.getByText('login.forgotPassword')
      
    expect(text).toBeInTheDocument()
  })
    
  it('should render login button', () => {
    const button = screen.getByText('login.loginButton')
      
    expect(button).toBeInTheDocument()
  })

  it('should show visibility icon', async () => {
    const visibilityOffIcon = screen.getByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcon)  
    const visibilityIcon = screen.getByTestId('VisibilityIcon')

    await waitFor(() => {
      expect(visibilityIcon).toBeInTheDocument()
      expect(visibilityOffIcon).not.toBeInTheDocument()
    })
  })
  
  it('should submit', async () => {
    const button = screen.getByText('login.loginButton')
    fireEvent.click(button)  
  
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled())
  })
})
