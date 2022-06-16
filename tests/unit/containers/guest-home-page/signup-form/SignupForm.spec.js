import { screen, fireEvent, waitFor } from '@testing-library/react'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { renderWithRouterAndTheme } from '~tests/test-utils'

const errors = { firstName: false, lastName: false, email: false, password: false, confirmPassword: false }
const data = { firstName: 'John', lastName: 'Doe', email: 'email@mail.com', password: 'passTest1', confirmPassword: 'passTest1' }
const handleChange = jest.fn()
const handleBlur = jest.fn()
const handleSubmit = jest.fn()

describe('Signup form', () => {
  beforeEach(() => {
    renderWithRouterAndTheme(
      <SignupForm
        data={ data }
        errors={ errors }
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
    )
  })

  it('should render firstName input', () => {
    const input = screen.getByText('signup.firstName')

    expect(input).toBeInTheDocument()
  })

  it('should render lastName input', () => {
    const input = screen.getByText('signup.lastName')

    expect(input).toBeInTheDocument()
  })

  it('should render email input', () => {
    const input = screen.getByText('signup.email')

    expect(input).toBeInTheDocument()
  })

  it('should render password input', () => {
    const input = screen.getByText('signup.password')

    expect(input).toBeInTheDocument()
  })

  it('should render confirmPassword input', () => {
    const input = screen.getByText('signup.confirmPassword')

    expect(input).toBeInTheDocument()
  })

  it('should render checkbox label', () => {
    const label = screen.getByText('signup.iAgree')

    expect(label).toBeInTheDocument()
  })

  it('should render signup button', () => {
    const button = screen.getByText('signup.signupButton')

    expect(button).toBeInTheDocument()
  })

  it('should show visibility icon', async () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcons[0])
    const visibilityIcons = screen.getAllByTestId('VisibilityIcon')

    await waitFor(() => expect(visibilityIcons[0]).toBeInTheDocument())
  })

  it('should submit form', async () => {
    const button = screen.getByText('signup.signupButton')
    fireEvent.click(button)

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled())
  })
})
