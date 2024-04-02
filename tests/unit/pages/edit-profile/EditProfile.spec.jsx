import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import EditProfile from '~/pages/edit-profile/EditProfile'
import { expect } from 'vitest'

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

const tabsData = [
  {
    id: 1,
    title: 'editTutor.main.profile',
    content: <div>profile</div>
  },
  {
    id: 2,
    title: 'editTutor.main.notifications',
    content: <div>notifications</div>
  },
  {
    id: 3,
    title: 'editTutor.main.passwordSecurity',
    content: <div>passwordSecurity</div>
  }
]

describe('EditProfile', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
        .reply(200, userMock)
      renderWithProviders(
        <EditProfile handleClick={handleClick} tabsData={tabsData} />,
        {
          preloadedState: mockState
        }
      )
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
    Object.values(tabsData).forEach((tabData) => {
      expect(screen.getByText(tabData.title)).toBeInTheDocument()
    })
  })

  it('should open menu tab after clicking on it', () => {
    const menuTab = screen.getByRole('button', {
      name: 'editTutor.main.notifications'
    })
    expect(menuTab).toBeInTheDocument()

    fireEvent.click(menuTab)

    expect(handleClick).toHaveBeenCalledWith(tabsData[1].content)
  })

  // it('should render user', async () => {
  //   const userName = await screen.findByText('John')
  //   expect(userName).toBeInTheDocument()
  // })
})
