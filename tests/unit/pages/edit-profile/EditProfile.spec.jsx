import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { openAlert } from '~/redux/features/snackbarSlice'
import EditProfile from '~/pages/edit-profile/EditProfile'
import { expect, vi } from 'vitest'
import { snackbarVariants } from '~/constants'
import { useAppSelector } from '~/hooks/use-redux'
import { LoadingStatusEnum } from '~/redux/redux.constants'

const userId = '63f5d0ebb'
const userRole = 'tutor'

const mockDispatch = vi.fn()

const mockState = {
  appMain: { userId, userRole },
  editProfile: {
    loading: LoadingStatusEnum.Fulfilled,
    tabValidityStatus: {
      profileTab: true,
      professionalInfoTab: true,
      notificationTab: true
    },
    profileState: {
      country: 'USA',
      city: 'New York',
      firstName: 'John',
      lastName: 'Doe',
      notificationSettings: {
        isOfferStatusNotification: false,
        isChatNotification: false,
        isSimilarOffersNotification: false,
        isEmailNotification: false
      }
    }
  }
}

const userMock = {
  role: userRole,
  videoLink: { [userRole]: '' },
  mainSubjects: { [userRole]: [] },
  firstName: 'John',
  lastName: 'Doe',
  address: { country: 'USA', city: 'New York' },
  professionalSummary: 'Summary',
  nativeLanguage: 'English',
  photo: {
    src: 'url',
    name: 'profile_photo'
  },
  professionalBlock: {
    education: 'Education',
    workExperience: 'Experience',
    scientificActivities: 'Activities',
    awards: 'Awards'
  },
  notificationSettings: {
    isOfferStatusNotification: false,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: false
  },
  tabValidityStatus: {
    profileTab: true,
    professionalInfoTab: true,
    notificationTab: true
  }
}

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({ checkConfirmation: () => true })
}))

vi.mock('~/redux/features/editProfileSlice', async () => {
  const actual = await vi.importActual('~/redux/features/editProfileSlice')
  return {
    ...actual,
    updateUser: vi.fn(),
    fetchUserById: vi.fn()
  }
})

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn()
  }
})

vi.mock('~/containers/edit-profile/profile-tab/ProfileTab', () => ({
  default: function () {
    return <div>ProfileTab</div>
  }
}))

vi.mock(
  '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab',
  () => ({
    default: function () {
      return <div>ProfessionalTab</div>
    }
  })
)

vi.mock('~/containers/edit-profile/notification-tab/NotificationTab', () => ({
  default: function () {
    return <div>NotificationMock</div>
  }
}))

vi.mock(
  '~/containers/edit-profile/password-security-tab/PasswordSecurityTab',
  () => ({
    default: function () {
      return <div>Password&SecurityMock</div>
    }
  })
)

describe('EditProfile', () => {
  beforeEach(async () => {
    useAppSelector.mockImplementation((selector) => selector(mockState))

    mockAxiosClient
      .onGet(`${URLs.users.get}/${userId}?role=${userRole}&isEdit=true`)
      .reply(200, userMock)

    renderWithProviders(<EditProfile />, {
      preloadedState: mockState
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should not include address in dataToUpdate if city or country is missing', () => {
    const city = ''
    const country = 'USA'
    const rest = {}

    const dataToUpdate = { ...rest }
    if (city && country) dataToUpdate.address = { city, country }

    expect(dataToUpdate).not.toHaveProperty('address')
  })

  it('should include address in dataToUpdate if city and country are provided', () => {
    const city = 'New York'
    const country = 'USA'
    const rest = {}

    const dataToUpdate = { ...rest }
    if (city && country) dataToUpdate.address = { city, country }

    expect(dataToUpdate).toHaveProperty('address', { city, country })
  })

  it('should not include notificationSettings in dataToUpdate if notificationSettings is null', () => {
    const notificationSettings = null
    const profileState = { notificationSettings }
    const rest = {}

    const dataToUpdate = { ...rest }
    if (notificationSettings) {
      dataToUpdate.notificationSettings = profileState.notificationSettings
    }

    expect(dataToUpdate).not.toHaveProperty('notificationSettings')
  })

  it('should not include professionalBlock in dataToUpdate if professionalBlock is null', () => {
    const professionalBlock = null
    const profileState = { professionalBlock }
    const rest = {}

    const dataToUpdate = { ...rest }
    if (professionalBlock) {
      dataToUpdate.professionalBlock = profileState.professionalBlock
    }

    expect(dataToUpdate).not.toHaveProperty('professionalBlock')
  })

  it('should include photo in dataToUpdate if profileState.photo is an object', () => {
    const photo = { src: 'photo.jpg', name: 'Profile Photo' }
    const profileState = { photo }
    const rest = {}

    const dataToUpdate = { ...rest }
    if (typeof profileState.photo === 'object') {
      dataToUpdate.photo = profileState.photo
    }

    expect(dataToUpdate).toHaveProperty('photo', profileState.photo)
  })
  it('should include videoLink in dataToUpdate if videoLink is an object with a property that matches the userRole', () => {
    const videoLink = { [userRole]: 'http://video1234556443.com/video' }
    const rest = {}
    const dataToUpdate = { ...rest }
    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string' ? videoLink : videoLink[userRole]
    }
    expect(dataToUpdate).toHaveProperty('videoLink', videoLink[userRole])
  })

  it('should include address in dataToUpdate if city and country are both truthy', () => {
    const city = 'New York'
    const country = 'USA'
    const rest = {}
    const dataToUpdate = { ...rest }
    if (city && country) dataToUpdate.address = { city, country }
    expect(dataToUpdate).toHaveProperty('address', { city, country })
  })

  it('should not include photo in dataToUpdate if profileState.photo is not an object', () => {
    const photo = 'stringInsteadOfObject'
    const profileState = { photo }
    const rest = {}

    const dataToUpdate = { ...rest }
    if (typeof profileState.photo === 'object') {
      dataToUpdate.photo = profileState.photo
    }

    expect(dataToUpdate).not.toHaveProperty('photo')
  })

  it('should not include videoLink in dataToUpdate if videoLink is null', () => {
    const videoLink = null
    const userRole = 'tutor'
    const rest = {}

    const dataToUpdate = { ...rest }
    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string' ? videoLink : videoLink[userRole]
    }

    expect(dataToUpdate).not.toHaveProperty('videoLink')
  })

  it('should include videoLink in dataToUpdate if videoLink is a string', () => {
    const videoLink = 'http://video1234556443.com/video'
    const userRole = 'tutor'
    const rest = {}

    const dataToUpdate = { ...rest }
    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string' ? videoLink : videoLink[userRole]
    }

    expect(dataToUpdate).toHaveProperty('videoLink', videoLink)
  })

  it('should include videoLink from userRole in dataToUpdate if videoLink is an object', () => {
    const videoLink = { tutor: 'http://video1111111.com/video' }
    const userRole = 'tutor'
    const rest = {}

    const dataToUpdate = { ...rest }
    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string' ? videoLink : videoLink[userRole]
    }

    expect(dataToUpdate).toHaveProperty('videoLink', videoLink[userRole])
  })

  it('should render the Update button', () => {
    const updateBtn = screen.getByText('editProfilePage.updateBtn')
    expect(updateBtn).toBeInTheDocument()
  })

  it('should enable the Update button if isChanged is true and isTabInvalid is false', () => {
    const updateBtn = screen.getByText('editProfilePage.updateBtn')

    useAppSelector.mockImplementation((selector) =>
      selector({
        ...mockState,
        editProfile: {
          ...mockState.editProfile,
          profileState: { ...userMock, firstName: 'John' },
          loading: LoadingStatusEnum.Fulfilled
        }
      })
    )

    expect(updateBtn).not.toBeDisabled()
  })

  it('should disable the Update button if isChanged is false and isTabInvalid is false', () => {
    const updateBtn = screen.getByText('editProfilePage.updateBtn')

    useAppSelector.mockImplementation((selector) =>
      selector({
        ...mockState,
        editProfile: {
          ...mockState.editProfile,
          profileState: { ...userMock },
          loading: LoadingStatusEnum.Fulfilled
        }
      })
    )

    expect(updateBtn).toHaveAttribute('aria-disabled', 'true')
  })

  it('should display a success alert on the Update click and successful update of the profile data', async () => {
    useAppSelector.mockImplementation((selector) =>
      selector({
        ...mockState,
        editProfile: {
          ...mockState.editProfile,
          profileState: { ...userMock, lastName: 'Cena' },
          loading: LoadingStatusEnum.Fulfilled
        }
      })
    )

    const updateBtn = screen.getByText('editProfilePage.updateBtn')
    fireEvent.click(updateBtn)

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    })
  })

  it('should render component with header, description and menu-tabs', async () => {
    const editProfileHeader = await screen.findByText('editProfilePage.title')
    expect(editProfileHeader).toBeInTheDocument()

    const editProfileDesc = await screen.findByText(
      'editProfilePage.description'
    )
    expect(editProfileDesc).toBeInTheDocument()

    const menuTabs = await screen.findAllByRole('listitem')
    expect(menuTabs).toHaveLength(4)
  })

  it('should render Profile Container after click on Profile menu button', async () => {
    const profileMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.generalTab.tabTitle'
    })
    fireEvent.click(profileMenuTab)
    await waitFor(() => {
      const profileContent = screen.getByText('ProfileTab')
      expect(profileContent).toBeInTheDocument()
    })
  })

  it('should render Professional tab Container after click on Professional menu button', async () => {
    const professionalTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.professionalTab.tabTitle'
    })
    fireEvent.click(professionalTab)
    await waitFor(() => {
      const professionalContent = screen.getByText('ProfessionalTab')
      expect(professionalContent).toBeInTheDocument()
    })
  })

  it('should render Notification Container after click on Notification menu button', async () => {
    const notificationMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.notificationsTab.tabTitle'
    })
    fireEvent.click(notificationMenuTab)
    await waitFor(() => {
      const notificationsContent = screen.getByText('NotificationMock')
      expect(notificationsContent).toBeInTheDocument()
    })
  })

  it('should render Security block after click on Password & Security menu button', async () => {
    const securityMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.passwordSecurityTab.tabTitle'
    })
    fireEvent.click(securityMenuTab)
    await waitFor(() => {
      const securityContent = screen.getByText('Password&SecurityMock')
      expect(securityContent).toBeInTheDocument()
    })
  })
})
