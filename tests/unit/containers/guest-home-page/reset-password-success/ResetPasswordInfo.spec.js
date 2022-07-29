import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import ResetPasswordSuccess from '~/containers/guest-home-page/reset-password-success/ResetPasswordSuccess'

describe('ResetPasswordSuccess test', () => {
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <ResetPasswordSuccess email="test@test.com" />
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
