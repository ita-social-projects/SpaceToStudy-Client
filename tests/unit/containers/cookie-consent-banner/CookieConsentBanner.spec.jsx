import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CookieConsentBanner from '~/containers/cookie-consent-banner/CookieConsentBanner'
import { renderWithProviders } from '~tests/test-utils'

const getFromLocalStorageMock = vi.fn()

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')

  return {
    ...actual,
    createPortal: (node) => node
  }
})

vi.mock('~/services/local-storage-service', () => ({
  getFromLocalStorage: () => getFromLocalStorageMock(),
  setToLocalStorage: vi.fn()
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

describe('CookieConsentBanner', () => {
  it('should render notice text and accept button', () => {
    getFromLocalStorageMock.mockReturnValue(false)
    renderWithProviders(<CookieConsentBanner />)

    const acceptButton = screen.getByText('cookieConsentBanner.acceptButton')
    const notice = screen.getByText('cookieConsentBanner.notice')
    expect(acceptButton).toBeInTheDocument()
    expect(notice).toBeInTheDocument()
  })

  it('does not display the banner if cookies have already been accepted', () => {
    getFromLocalStorageMock.mockReturnValue(true)
    renderWithProviders(<CookieConsentBanner />)

    const acceptButton = screen.queryByText('cookieConsentBanner.acceptButton')
    expect(acceptButton).not.toBeInTheDocument()
  })

  it('banner should disappear after accept button click', () => {
    getFromLocalStorageMock.mockReturnValue(false)
    renderWithProviders(<CookieConsentBanner />)

    const acceptButton = screen.getByText('cookieConsentBanner.acceptButton')
    expect(acceptButton).toBeInTheDocument()

    fireEvent.click(acceptButton)

    expect(acceptButton).not.toBeInTheDocument()
  })
})
