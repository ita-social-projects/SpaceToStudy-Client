import { screen, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'

import { axiosClient } from '~/plugins/axiosClient'
import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import TutorHome from '~/pages/tutor-home/TutorHome'
import { renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockAxiosClient = new MockAdapter(axiosClient)

const userId = '63f5d0ebb'
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }

const TutorHomeWithProviders = () => (
  <ConfirmationDialogProvider>
    <ModalProvider>
      <TutorHome />
    </ModalProvider>
  </ConfirmationDialogProvider>
)

describe('TutorHome component', () => {
  mockAxiosClient.onGet(`${URLs.users.get}/${userId}`).reply(200, { data: userDataMock })

  const firstLoginState = {
    appMain: { isFirstLogin: true, userRole: 'tutor', userId: userId }
  }
  const secondLoginState = {
    appMain: { isFirstLogin: false, userRole: 'tutor', userId: userId }
  }

  it('should render a BecomeATutor modal when logging in for the first time', async () => {
    renderWithProviders(<TutorHomeWithProviders />, { preloadedState: firstLoginState })
    
    await waitFor(() => expect(screen.getByText(/becomeTutor.generalInfo.title/i)).toBeInTheDocument())
  })

  it('shouldn\'t render a BecomeATutor modal when logging in for the second time', () => {
    renderWithProviders(<TutorHomeWithProviders />, { preloadedState: secondLoginState })

    const titleToFind = screen.queryByText(/becomeTutor.generalInfo.title/i)
    expect(titleToFind).not.toBeInTheDocument()
  })
})
