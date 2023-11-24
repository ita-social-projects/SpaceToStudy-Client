import { screen, fireEvent, waitFor } from '@testing-library/react'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { accessToken } from '~tests/unit/redux/redux.variables'

const mockSelector = vi.fn()
const unwrap = vi.fn().mockResolvedValue({ accessToken })
const loginUser = vi.fn().mockReturnValue({ unwrap })

const mockState = {
  appMain: { authLoading: false }
}

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: () => mockSelector.mockReturnValue(mockState)
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useLoginMutation: () => [loginUser]
  }
})

describe('Login dialog test', () => {
  beforeEach(() => {
    renderWithProviders(<LoginDialog />)
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
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.focusOut(inputEmail)

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

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledTimes(1)
    })
  })
})
