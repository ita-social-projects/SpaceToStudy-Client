import { screen, waitFor, fireEvent, act } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import EditProfile from '~/pages/edit-profile/EditProfile'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'

const handleClick = vi.fn()

const userId = '63f5d0ebb'
const userRole = 'tutor'

const userMock = {
  firstName: 'John',
  lastName: 'Doe',
  address: {
    country: 'United States',
    city: 'New York'
  },
  professionalSummary: 'Experienced professional',
  nativeLanguage: 'English'
}

vi.mock(
  '~/containers/edit-profile/profile-general-tab/ProfileGeneralTab',
  () => ({
    __esModule: true,
    default: function () {
      return (
        <div>
          <div>{userMock.firstName}</div>
          <div>{userMock.lastName}</div>
          <div>{userMock.address.country}</div>
          <div>{userMock.address.city}</div>
          <div>{userMock.professionalSummary}</div>
          <div>{userMock.nativeLanguage}</div>
        </div>
      )
    }
  })
)

const mockState = {
  appMain: { userId: userId, userRole: userRole }
}

// const tabsData = [
//   {
//     title: 'editTutor.main.profile',
//     content: <div>profile</div>
//   },
//   {
//     title: 'editTutor.main.notifications',
//     content: <div>notifications</div>
//   },
//   {
//     title: 'editTutor.main.passwordSecurity',
//     content: <div>passwordSecurity</div>
//   }
// ]

describe('EditProfile', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
        .reply(200, userMock)
      renderWithProviders(<EditProfile handleClick={handleClick} />, {
        preloadedState: mockState
      })
    })
  })

  it('should render Edit Profile component with header, description and menu-tabs', async () => {
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

  it('should render correct text for each menu tab', () => {
    Object.values(tabsData).forEach((tabsData) => {
      expect(screen.getByText(tabsData.title)).toBeInTheDocument()
    })
  })

  it('calls handleClick when a menu item is clicked', async () => {
    const menuTab = await screen.findByRole('button', {
      name: 'editTutor.main.notifications'
    })
    expect(menuTab).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuTab)
    })

    await waitFor(() => {
      const notificationsContent = screen.getByText(tabsData[1].content)
      expect(notificationsContent).toBeInTheDocument()
    })
  })

  // it('should render user', async () => {
  //   const userName = await screen.findByText('John')
  //   expect(userName).toBeInTheDocument()
  // })
})
