import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import ResetPasswordInfo from '~/containers/guest-home-page/reset-password-info/ResetPasswordInfo'

describe('ResetPasswordInfo test', () => {
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <ResetPasswordInfo email="test@test.com" />
      </ModalProvider>
    )
  })

  it('should render info image', () => {
    const learnImg = screen.getByAltText('info')

    expect(learnImg).toBeInTheDocument()
  })

  it('should render title', () => {
    const title = screen.getByText('login.passwordReset')

    expect(title).toBeInTheDocument()
  })

  it('should not to be in document after timeout', () => {
    const title = screen.queryByText('login.passwordReset')

    setTimeout(() => expect(title).not.toBeInTheDocument(), 5000)
  })
})
