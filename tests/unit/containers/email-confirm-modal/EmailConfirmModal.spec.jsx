import { screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import * as useQuery from '~/hooks/use-query'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const closeModal = vi.fn()

const props = { confirmToken: 'test', closeModal }

describe('EmailConfirmModal test', () => {
  it('should render negative-scenario image and message (BAD_CONFIRM_TOKEN)', async () => {
    mockAxiosClient
      .onGet(URLs.auth.confirm.replace(':token', props.confirmToken))
      .reply(400, { code: 'BAD_CONFIRM_TOKEN' })

    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = await screen.findByAltText('info')
    const title = screen.getByText('modals.emailNotConfirm')
    const description = screen.getByText('modals.emailReject.badToken')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render negative-scenario image and message (EMAIL_ALREADY_CONFIRMED)', async () => {
    mockAxiosClient
      .onGet(URLs.auth.confirm.replace(':token', props.confirmToken))
      .reply(400, { code: 'EMAIL_ALREADY_CONFIRMED' })

    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = await screen.findByAltText('info')
    const title = screen.getByText('modals.emailAlreadyConfirm')
    const description = screen.getByText('modals.emailReject.alreadyConfirmed')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render positive-scenario image and message - (response from useQuery)', async () => {
    mockAxiosClient
      .onGet(URLs.auth.confirm.replace(':token', props.confirmToken))
      .reply(204, null)

    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = await screen.findByAltText('info')
    const title = screen.getByText('modals.emailConfirm')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  it('should render Loader - (loading from useQuery)', () => {
    const useQuerySpy = vi.spyOn(useQuery, 'default')

    useQuerySpy.mockReturnValueOnce({
      isLoading: true
    })

    renderWithProviders(<EmailConfirmModal {...props} />)

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should render button', async () => {
    mockAxiosClient
      .onGet(URLs.auth.confirm.replace(':token', props.confirmToken))
      .reply(204, null)

    renderWithProviders(<EmailConfirmModal {...props} />)

    const button = await screen.findByText('button.goToLogin')

    expect(button).toBeInTheDocument()
  })
})
