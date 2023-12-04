import { fireEvent, screen } from '@testing-library/react'
import AcceptCooperationModal from '~/containers/my-cooperations/accept-cooperation-modal/AcceptCooperationModal'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import useBreakpoints from '~/hooks/use-breakpoints'
import { mockedCoop } from '~tests/unit/containers/my-cooperations/MyCooperations.spec.constants'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (callback) => callback
}))

vi.mock('~/hooks/use-breakpoints')
useBreakpoints.mockImplementation(() => ({ isDesktop: true }))

const preloadedState = {
  appMain: { userRole: 'tutor' }
}

describe('AcceptCooperationModal component ', () => {
  beforeEach(() => {
    mockAxiosClient
      .onPatch(`${URLs.cooperations.update}/${mockedCoop._id}`)
      .reply(200, { data: null })

    mockAxiosClient
      .onPatch(`${URLs.offers.update}/${mockedCoop._id}`)
      .reply(200, { updateData: null })

    renderWithProviders(
      <AcceptCooperationModal
        cooperation={mockedCoop}
        getCooperations={vi.fn()}
      />,
      {
        preloadedState
      }
    )
  })
  it('should render modal', () => {
    const title = screen.getByText('cooperationsPage.acceptModal.title')

    expect(title).toBeInTheDocument()
  })
  it('should accept cooperation', async () => {
    const acceptButton = screen.getByText('cooperationsPage.acceptModal.accept')

    fireEvent.click(acceptButton)

    const confirmButton = screen.getByText('common.yes')

    fireEvent.click(confirmButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.acceptModal.successMessage'
    )

    expect(snackbar).toBeInTheDocument()
  })
  it('should decline cooperation', async () => {
    const declineButton = screen.getByText(
      'cooperationsPage.acceptModal.decline'
    )

    fireEvent.click(declineButton)

    const confirmButton = screen.getByText('common.yes')

    fireEvent.click(confirmButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.acceptModal.successMessage'
    )

    expect(snackbar).toBeInTheDocument()
  })

  it('should resend cooperation', async () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 200 } })

    const resendButton = screen.getByText('cooperationsPage.acceptModal.resend')

    fireEvent.click(resendButton)

    const confirmButton = screen.getByText('common.yes')

    fireEvent.click(confirmButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.acceptModal.successMessage'
    )

    expect(snackbar).toBeInTheDocument()
  })
})
