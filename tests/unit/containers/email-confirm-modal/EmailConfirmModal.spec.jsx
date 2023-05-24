import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'

const closeModal = vi.fn()

vi.mock('~/hooks/use-axios')

describe('EmailConfirmModal test', () => {
  const props = {
    confirmToken: 'test',
    closeModal: closeModal
  }

  it('should render negative-scenario image and message (BAD_CONFIRM_TOKEN)', async () => {
    const fakeData = {
      error: { code: 'BAD_CONFIRM_TOKEN' },
      loading: false,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailNotConfirm')
    const description = screen.getByText('modals.emailReject.badToken')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render negative-scenario image and message (EMAIL_ALREADY_CONFIRMED)', async () => {
    const fakeData = {
      error: { code: 'EMAIL_ALREADY_CONFIRMED' },
      loading: false,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailAlreadyConfirm')
    const description = screen.getByText('modals.emailReject.alreadyConfirmed')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render positive-scenario image and message - (response from useAxios)', async () => {
    const fakeData = {
      error: null,
      loading: false,
      response: { response: { status: 204 } }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailConfirm')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  it('should render Loader - (loading from useAxios)', async () => {
    const fakeData = {
      error: null,
      loading: true,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should render button', async () => {
    const fakeData = {
      error: null,
      loading: false,
      response: { response: { status: 204 } }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const button = screen.getByText('button.goToLogin')

    expect(button).toBeInTheDocument()
  })
})
