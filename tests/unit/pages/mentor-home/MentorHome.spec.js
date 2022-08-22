import { screen } from '@testing-library/react'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import MentorHome from '~/pages/mentor-home/MentorHome'
import { renderWithProviders } from '~tests/test-utils'

const MentorHomeWithProviders = () => (
  <ConfirmationDialogProvider>
    <ModalProvider>
      <MentorHome />
    </ModalProvider>
  </ConfirmationDialogProvider>
)

describe('MentorHome component', () => {
  const firstLoginState = {
    appMain: { isFirstLogin: true }
  }
  const secondLoginState = {
    appMain: { isFirstLogin: false }
  }

  it('should render a BecomeATutor modal when logging in for the first time', () => {
    renderWithProviders(<MentorHomeWithProviders />, { preloadedState: firstLoginState })

    const firstTab = screen.getByText(/becomeTutor.generalInfo.title/i)
    expect(firstTab).toBeInTheDocument()
  })

  it('shouldn\'t render a BecomeATutor modal when logging in for the second time', () => {
    renderWithProviders(<MentorHomeWithProviders />, { preloadedState: secondLoginState })

    const titleToFind = screen.queryByText(/becomeTutor.generalInfo.title/i)
    expect(titleToFind).not.toBeInTheDocument()
  })
})
