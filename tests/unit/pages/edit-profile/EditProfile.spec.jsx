import { screen, waitFor, fireEvent, act } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import EditProfile from '~/pages/edit-profile/EditProfile'

const userId = '63f5d0ebb'
const userRole = 'tutor'

const mockState = {
  appMain: { userId: userId, userRole: userRole }
}

const userMock = 'UserProfileMock'

vi.mock(
  '~/containers/edit-profile/profile-general-tab/ProfileGeneralTab',
  () => ({
    __esModule: true,
    default: function () {
      return <div>{userMock}</div>
    }
  })
)

vi.mock(
  '~/containers/edit-profile/notification-tab/NotificationConTainer',
  () => ({
    __esModule: true,
    default: function () {
      return <div>NotificationContainerMock</div>
    }
  })
)

vi.mock('~/containers/tutor-profile/security-block/SecurityBlock', () => ({
  __esModule: true,
  default: function () {
    return <div>Password&SecurityMock</div>
  }
}))

describe('EditProfile', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
        .reply(200, userMock)
      renderWithProviders(<EditProfile />, {
        preloadedState: mockState
      })
    })
  })

  it('should render component with header, description and menu-tabs', async () => {
    const editProfileHeader = await screen.findByText(
      'editTutor.main.accountSettings'
    )
    expect(editProfileHeader).toBeInTheDocument()

    const editProfileDesc = await screen.findByText(
      'editTutor.main.littleDescription'
    )
    expect(editProfileDesc).toBeInTheDocument()

    const menuTabs = await screen.findAllByRole('listitem')
    expect(menuTabs).toHaveLength(3)
  })

  it('should render Profile Container after click on Profile menu button', async () => {
    const profileMenuTab = await screen.findByRole('button', {
      name: 'editTutor.main.profile'
    })
    act(() => {
      fireEvent.click(profileMenuTab)
    })
    await waitFor(() => {
      const profileContent = screen.getByText('UserProfileMock')
      expect(profileContent).toBeInTheDocument()
    })
  })

  it('should render Notification Container after click on Notification menu button', async () => {
    const notificationMenuTab = await screen.findByRole('button', {
      name: 'editTutor.main.notifications'
    })
    act(() => {
      fireEvent.click(notificationMenuTab)
    })
    await waitFor(() => {
      const notificationsContent = screen.getByText('NotificationContainerMock')
      expect(notificationsContent).toBeInTheDocument()
    })
  })

  it('should render Security block after click on Password & Security menu button', async () => {
    const securityMenuTab = await screen.findByRole('button', {
      name: 'editTutor.main.passwordSecurity'
    })
    act(() => {
      fireEvent.click(securityMenuTab)
    })
    await waitFor(() => {
      const securityContent = screen.getByText('Password&SecurityMock')
      expect(securityContent).toBeInTheDocument()
    })
  })
})
