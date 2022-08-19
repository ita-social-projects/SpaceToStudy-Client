import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import EmailConfirmModal from '~/components/email-confirm-modal/emailConfirmModal'
import useAxios from '~/hooks/use-axios'

const closeModal = jest.fn()
const openLoginDialog = jest.fn()

jest.mock('~/hooks/use-axios')

describe('EmailConfirmModal test', () => {
  const props = {
    confirmToken: 'test',
    closeModal: closeModal
  }

  it('should render negative-scenario image and message - (error from useAxios)', async() => {
    const fakeData = {
      error : { response : { status: 400 } },
      loading : false,
      response : null
    }
    useAxios.mockImplementation(() => fakeData )
    renderWithProviders(<EmailConfirmModal { ...props } />)

    const modalImg = screen.getByAltText('email-reject-icon')
    const message = screen.getByTestId('reject-message')

    expect(modalImg).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })

  it('should render positive-scenario image and message - (response from useAxios)', async() => {
    const fakeData = {
      error : null,
      loading : false,
      response : { response : { status: 204 } }
    }
    useAxios.mockImplementation(() => fakeData )
    renderWithProviders(<EmailConfirmModal { ...props } />)

    const modalImg = screen.getByAltText('email-confirm-icon')
    const message = screen.getByTestId('confirm-message')

    expect(modalImg).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })

  it('should render Loader - (loading from useAxios)',async () => {
    const fakeData = {
      error : null,
      loading : true,
      response : null
    }
    useAxios.mockImplementation(() => fakeData )
    renderWithProviders(<EmailConfirmModal { ...props } />)

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should render button', async () => {
    const fakeData = {
      error : { response : { status: 400 } },
      loading : false,
      response : null
    }
    useAxios.mockImplementation(() => fakeData )
    renderWithProviders(<EmailConfirmModal { ...props } />)

    const button = screen.getByTestId('toLoginButton')

    expect(button).toBeInTheDocument()
  })

})
