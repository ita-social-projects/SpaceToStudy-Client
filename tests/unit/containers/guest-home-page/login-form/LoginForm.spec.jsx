import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import { vi } from 'vitest'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

const errors = { email: false, password: false }
const data = { email: 'email@mail.com', password: 'passTest1' }
const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()

describe('Login form test', () => {
  const preloadedState = { appMain: { authLoading: false } }
  beforeEach(() => {
    renderWithProviders(
      <LoginForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )
  })

  it('should render email input label', () => {
    const inputLabel = screen.getByLabelText(/email/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render password input label', () => {
    const inputLabel = screen.getByText('common.labels.password')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render forgot password text', () => {
    const text = screen.getByText('login.forgotPassword')

    expect(text).toBeInTheDocument()
  })

  it('should render login button', () => {
    const button = screen.getByText('common.labels.login')

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
    handleSubmit.mockImplementation((event) => {
      event.preventDefault()
    })
    const button = screen.getByText('common.labels.login')
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should click forgot password text and open forgot password container', async () => {
    const text = screen.getByText('login.forgotPassword')
    fireEvent.click(text)
    const backBtn = screen.queryByText('login.backToLogin')

    await waitFor(() => expect(backBtn).toBeInTheDocument())
  })
})

describe('Login form test with loading', () => {
  const preloadedState = { appMain: { authLoading: true } }
  it('should render loader', () => {
    renderWithProviders(
      <LoginForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
