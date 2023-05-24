import { screen, fireEvent, waitFor } from '@testing-library/react'

import { login, signup } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const mockCloseModal = vi.fn()
const mockOpenModal = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: mockCloseModal,
      openModal: mockOpenModal
    })
  }
})
const mockGoogle = {
  accounts: { id: { initialize: vi.fn(), renderButton: vi.fn() } }
}

const originalGoogle = global.google
const buttonWidth = { xs: '300px', md: '400px' }

describe('GoogleLogin component test for login', () => {
  beforeAll(() => {
    global.google = mockGoogle
  })
  afterAll(() => {
    global.google = originalGoogle
  })
  beforeEach(() => {
    renderWithProviders(<GoogleLogin buttonWidth={buttonWidth} type={login} />)
  })

  it('should have "or continue" text', () => {
    const text = screen.getByText('login.continue')

    expect(text).toBeInTheDocument()
  })

  it('should have "have account" text', () => {
    const text = screen.getByText('login.haveAccount')

    expect(text).toBeInTheDocument()
  })

  it('should have "Join us" text', () => {
    const text = screen.getByText('login.joinUs')

    expect(text).toBeInTheDocument()
  })

  it('should close login modal after click', async () => {
    const link = screen.getByText('login.joinUs')
    fireEvent.click(link)

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
})

describe('GoogleLogin component test for signup', () => {
  beforeAll(() => {
    global.google = mockGoogle
  })
  afterAll(() => {
    global.google = originalGoogle
  })

  beforeEach(() => {
    renderWithProviders(<GoogleLogin buttonWidth={buttonWidth} type={signup} />)
  })

  it('should render login popup', async () => {
    const link = screen.getByText('signup.joinUs')
    fireEvent.click(link)

    await waitFor(() => expect(mockOpenModal).toHaveBeenCalled())
  })
})
