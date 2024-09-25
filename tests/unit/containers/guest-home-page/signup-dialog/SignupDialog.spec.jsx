import { expect, vi } from 'vitest'
import { screen, fireEvent, waitFor, renderHook } from '@testing-library/react'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { renderWithProviders } from '~tests/test-utils'
import { student } from '~/constants'
import useBreakpoints from '~/hooks/use-breakpoints'

const mockSelector = vi.fn()
const unwrap = vi.fn().mockResolvedValue({})
const signUp = vi.fn().mockReturnValue({ unwrap })

const mockState = {
  appMain: { authLoading: true }
}

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: () => mockSelector.mockImplementation(mockState)
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useSignUpMutation: () => [signUp]
  }
})

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isDesktop: false,
    isLaptopAndAbove: false,
    isTablet: false,
    isMobile: true
  }))
}))

describe('Signup dialog test', () => {
  beforeEach(() => {
    renderWithProviders(<SignupDialog type={student} />)
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
    const inputEmail = screen.getByLabelText(/common.labels.firstName/i)
    fireEvent.focusOut(inputEmail)

    const error = screen.getByText('common.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })

  it('should call mutation after button submit', async () => {
    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)

    fireEvent.change(inputFirstName, { target: { value: 'test' } })

    expect(inputFirstName.value).toBe('test')

    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)

    fireEvent.change(inputLastName, { target: { value: 'test' } })

    expect(inputFirstName.value).toBe('test')

    const inputEmail = screen.getByLabelText(/common.labels.email/i)

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    expect(inputEmail.value).toBe('test@gmail.com')

    const inputPassword = screen.getByLabelText(/common.labels.password/i)

    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    expect(inputPassword.value).toBe('12345678a/A')

    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678a/A' } })

    expect(inputConfirmPassword.value).toBe('12345678a/A')

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    const button = screen.getByText('common.labels.signup')

    fireEvent.click(button)

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledTimes(1)
    })
  })

  it('isDesktop', () => {
    useBreakpoints.mockImplementation(() => ({
      isDesktop: true,
      isLaptopAndAbove: false,
      isTablet: false,
      isMobile: false
    }))
    const { result } = renderHook(useBreakpoints)
    expect(result).toBeTruthy()
  })

  it('isLaptopAndAbove', () => {
    useBreakpoints.mockImplementation(() => ({
      isDesktop: false,
      isLaptopAndAbove: true,
      isTablet: false,
      isMobile: false
    }))
    const { result } = renderHook(useBreakpoints)
    expect(result).toBeTruthy()
  })

  it('isTablet', () => {
    useBreakpoints.mockImplementation(() => ({
      isDesktop: false,
      isLaptopAndAbove: false,
      isTablet: true,
      isMobile: false
    }))
    const { result } = renderHook(useBreakpoints)
    expect(result).toBeTruthy()
  })

  it('isMobile', () => {
    const { result } = renderHook(useBreakpoints)
    expect(result).toBeTruthy()
  })
})
