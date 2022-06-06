import { screen, render } from '@testing-library/react'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'

describe('GoogleLogin component test', () => {
  beforeEach(() => {
    render(
      <GoogleLogin />
    )
  })

  it('should have "or continue" text', () => {
    const text = screen.getByText('login.continue')
    
    expect(text).toBeInTheDocument()
  })
    
  it('should have button with "Login with Google" text', () => {
    const linkElement = screen.getByText('login.googleButton')
    
    expect(linkElement).toBeInTheDocument()
  })
    
  it('should have "have account" text', () => {
    const text = screen.getByText('login.haveAccount')
    
    expect(text).toBeInTheDocument()
  })
    
  it('should have "Join us" text', () => {
    const text = screen.getByText('login.joinUs')
    
    expect(text).toBeInTheDocument()
  })
})
