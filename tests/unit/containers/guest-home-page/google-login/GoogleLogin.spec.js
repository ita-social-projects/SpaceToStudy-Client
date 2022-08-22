import { screen, render } from '@testing-library/react'
import { login } from '~/containers/guest-home-page/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'

describe('GoogleLogin component test', () => {
  beforeEach(() => {
    render(<GoogleLogin type={ login } />)
  })

  it('should have "or continue" text', () => {
    const text = screen.getByText('login.continue')

    expect(text).toBeInTheDocument()
  })

  it('should have google logo', () => {
    const logo = screen.getByAltText('google icon')

    expect(logo).toBeInTheDocument()
  })
  it('should have button with "Login with Google" text', () => {
    const button = screen.getByText('login.googleButton')

    expect(button).toBeInTheDocument()
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
