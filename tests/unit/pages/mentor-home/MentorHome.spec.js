import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import MentorHome from '~/pages/mentor-home/MentorHome'

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

const MentorHomeWithProviders = () => (
  <MemoryRouter>
    <ConfirmationDialogProvider>
      <ModalProvider>
        <MentorHome />
      </ModalProvider>
    </ConfirmationDialogProvider>
  </MemoryRouter>
)

describe('MentorHome component', () => {
  it('should render a BecomeATutor modal when logging in for the first time', () => {
    useSelector.mockImplementation((fn) =>
      fn({
        appMain: { isFirstLogin: true }
      })
    )
    render(<MentorHomeWithProviders />)

    const firstTab = screen.getByText(/becomeTutor.generalInfo.title/i)
    expect(firstTab).toBeInTheDocument()
  })

  it("shouldn't render a BecomeATutor modal when logging in for the second time", () => {
    useSelector.mockImplementation((fn) =>
      fn({
        appMain: { isFirstLogin: false }
      })
    )
    render(<MentorHomeWithProviders />)

    const titleToFind = screen.queryByText(/becomeTutor.generalInfo.title/i)
    expect(titleToFind).not.toBeInTheDocument()
  })
})
