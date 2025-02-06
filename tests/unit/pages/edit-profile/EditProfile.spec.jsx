import { screen, waitFor, fireEvent, renderHook  } from '@testing-library/react'
import { useMemo } from 'react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import EditProfile from '~/pages/edit-profile/EditProfile'
import ProfileTabForm from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm'
import { expect, vi } from 'vitest'
import { useAppSelector } from '~/hooks/use-redux'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { mapMainSubjects } from '~/pages/edit-profile/EditProfile'
import { UserRoleEnum } from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'

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
    },
    videoLink: { tutor: '', student: '' }
  }
}

const userMock = {
  role: userRole,
  videoLink: { tutor: '', student: '' },
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

const mockData = {
  firstName: '',
  lastName: '',
  photo: null,
  videoLink: '',
  errors: {
    firstName: '',
    lastName: '',
    videoLink: ''
  }
}

const hasChanges = (
  initialData,
  currentData
) => JSON.stringify(initialData) !== JSON.stringify(currentData);

const profileStateMock = {
  videoLink: 'https://newvideolink.com',
  notificationSettings: { 
    isOfferStatusNotification: false,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: false
   },
  professionalBlock: { 
    education: 'Computer Science',
    workExperience: 'Experience',
    scientificActivities: 'Activities',
    awards: 'Awards'
   },
  aboutStudent: { bio: 'New bio' },
  photo: 'new-photo.jpg'
}

const initialEditProfileStateMock = {
  videoLink: 'https://oldvideolink.com',
  notificationSettings: { 
    isOfferStatusNotification: true,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: true
   },
  professionalBlock: { 
    education: 'Education',
    workExperience: 'Experience',
    scientificActivities: 'Activities',
    awards: 'Awards'
   },
  aboutStudent: { bio: 'Old bio' },
  photo: 'old-photo.jpg'
}

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({ checkConfirmation: vi.fn().mockReturnValue(true) })
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

vi.mock('AppTextField', () => ({
  __esModule: true,
  default: ({
    errorMsg,
    label,
    onBlur,
    onChange,
    placeholder,
    value,
    InputProps
  }) => (
    <input
      aria-label={label}
      value={value || ''}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={errorMsg ? 'true' : 'false'}
      {...InputProps}
    />
  )
}))

describe('EditProfile', () => {
  const getLatestChanges = vi.fn()

  const clickUpdateAndGetChanges = (mockChanges = {}) => {
    getLatestChanges.mockReturnValue(mockChanges)
    const updateBtn = screen.getByText('editProfilePage.updateBtn')
    fireEvent.click(updateBtn)
    return getLatestChanges()
  }

  beforeEach(async () => {
    useAppSelector.mockImplementation((selector) => selector(mockState))

    mockAxiosClient
      .onGet(`${URLs.users.get}/${userId}?role=${userRole}&isEdit=true`)
      .reply(200, userMock)

    await waitFor(() => {
      renderWithProviders(<EditProfile />, { preloadedState: mockState })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should not include address in dataToUpdate if city or country is missing', () => {
    const city = ''
    const country = 'USA'

    const dataToUpdate = {}
    if (city && country) dataToUpdate.address = { city, country }

    expect(dataToUpdate).not.toHaveProperty('address')
  })

  it('should include address in dataToUpdate if city and country are provided', () => {
    const city = 'New York'
    const country = 'USA'
    const dataToUpdate = {}

    if (city && country) dataToUpdate.address = { city, country }

    expect(dataToUpdate).toHaveProperty('address', { city, country })
  })

  it('should not include notificationSettings in dataToUpdate if notificationSettings is null', () => {
    const notificationSettings = null
    const profileState = { notificationSettings }

    const dataToUpdate = {}
    if (notificationSettings) {
      dataToUpdate.notificationSettings = profileState.notificationSettings
    }

    expect(dataToUpdate).not.toHaveProperty('notificationSettings')
  })

  it('should not include professionalBlock in dataToUpdate if professionalBlock is null', () => {
    const professionalBlock = null
    const profileState = { professionalBlock }

    const dataToUpdate = {}
    if (professionalBlock) {
      dataToUpdate.professionalBlock = profileState.professionalBlock
    }

    expect(dataToUpdate).not.toHaveProperty('professionalBlock')
  })

  it('should include photo in dataToUpdate if profileState.photo is an object', () => {
    const photo = { src: 'photo.jpg', name: 'Profile Photo' }
    const profileState = { photo }

    const dataToUpdate = {}
    if (typeof profileState.photo === 'object') {
      dataToUpdate.photo = profileState.photo
    }

    expect(dataToUpdate).toHaveProperty('photo', profileState.photo)
  })

  it('should not include photo in dataToUpdate if profileState.photo is a filled string', () => {
    const photo = 'stringInsteadOfObject'
    const profileState = { photo }

    const dataToUpdate = {}
    if (typeof profileState.photo === 'object' || profileState.photo === '') {
      dataToUpdate.photo = profileState.photo
    }

    expect(dataToUpdate).not.toHaveProperty('photo')
  })

  it('should include photo in dataToUpdate if profileState.photo is empty string', () => {
    const photo = ''
    const profileState = { photo }

    const dataToUpdate = {}
    if (typeof profileState.photo === 'object' || profileState.photo === '') {
      dataToUpdate.photo = profileState.photo
    }

    expect(dataToUpdate).toHaveProperty('photo')
  })

  
  it('should include videoLink in dataToUpdate if videoLink exists for the current userRole', () => {
    const videoLink = { [userRole]: 'http://example.com/video' }
    const dataToUpdate = {}
  
    if (videoLink?.[userRole]) {
      dataToUpdate.videoLink = videoLink[userRole]
    }
  
    expect(dataToUpdate).toHaveProperty('videoLink', videoLink[userRole])
  })

  it('should not include videoLink in dataToUpdate if videoLink does not exist for the current userRole', () => {
    const videoLink = { student: 'http://example.com/video' }
    const dataToUpdate = {}
  
    if (videoLink?.[userRole]) {
      dataToUpdate.videoLink = videoLink[userRole]
    }
  
    expect(dataToUpdate).not.toHaveProperty('videoLink')
  })

  it('should not include videoLink in dataToUpdate if videoLink is an empty string for the current userRole', () => {
    const videoLink = { [userRole]: '' }
    const dataToUpdate = {}
  
    if (videoLink?.[userRole]) {
      dataToUpdate.videoLink = videoLink[userRole]
    }
  
    expect(dataToUpdate).not.toHaveProperty('videoLink')
  })

  it('should not include videoLink in dataToUpdate if videoLink is undefined', () => {
    const videoLink = undefined

    const dataToUpdate = {}
    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string' ? videoLink : videoLink[userRole]
    }

    expect(dataToUpdate).not.toHaveProperty('videoLink')
  })

  it('should not include videoLink in dataToUpdate if videoLink is undefined or null', () => {
    const videoLink = null
    const dataToUpdate = {}
  
    if (videoLink?.[userRole]) {
      dataToUpdate.videoLink = videoLink[userRole]
    }
  
    expect(dataToUpdate).not.toHaveProperty('videoLink')
  });

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
    const updateBtn = screen.getByText('editProfilePage.updateBtn').parentNode

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

  it('should replace the existing text in the "First name" field with test data and Update button becomes anable and active', () => {
    const testData = ["O'braian", "Мар'яна", 'Анна-Марія', 'Анна Марія']

    const mockT = vi.fn((key) => {
      const translations = {
        'common.labels.firstName': 'First Name',
        'editProfilePage.updateBtn': 'Update'
      }
      return translations[key] || key
    })

    const mockHandleInputChange = vi.fn()

    renderWithProviders(
      <ProfileTabForm
        t={mockT}
        data={mockData}
        errors={mockData.errors}
        handleInputChange={mockHandleInputChange}
        handleBlur={() => {}}
        openAlert={() => {}}
      />
    )

    const firstNameInput = screen.getByLabelText(/common.labels.firstName/i)
    expect(firstNameInput).toBeInTheDocument()

    for (const data of testData) {
      fireEvent.change(firstNameInput, { target: { value: data } })

      const updateButton = screen.getByText('editProfilePage.updateBtn')
      expect(updateButton).not.toBeDisabled()
    }
  })

  it('should replace the existing text in the "Last name" field with test data and Update button becomes anable and active', () => {
    const testData = ["Mc'Neil", "O'Neill-Johnson", 'Van Gogh']

    const mockT = vi.fn((key) => {
      const translations = {
        'common.labels.lastName': 'Last Name',
        'editProfilePage.updateBtn': 'Update'
      }
      return translations[key] || key
    })

    const mockHandleInputChange = vi.fn()

    renderWithProviders(
      <ProfileTabForm
        t={mockT}
        data={mockData}
        errors={mockData.errors}
        handleInputChange={mockHandleInputChange}
        handleBlur={() => {}}
        openAlert={() => {}}
      />
    )

    const lastNameInput = screen.getByLabelText(/common.labels.lastName/i)
    expect(lastNameInput).toBeInTheDocument()

    for (const data of testData) {
      fireEvent.change(lastNameInput, { target: { value: data } })

      const updateButton = screen.getByText('editProfilePage.updateBtn')
      expect(updateButton).not.toBeDisabled()
    }
  })

  it('should correctly update dataToUpdate.mainSubjects based on categories and userRole', () => {
    const categories = {
      ['tutor']: [
        {
          category: { _id: 'cat1' },
          subjects: [{ _id: 'sub1' }, { _id: 'sub2' }]
        }
      ]
    }

    const dataToUpdate = {}

    if (categories?.[userRole]) {
      dataToUpdate.mainSubjects = {
        [userRole]: categories[userRole].map((item) => ({
          category: { _id: item.category._id },
          subjects: item.subjects.map((subject) => ({
            _id: subject._id
          }))
        }))
      }
    }

    const expectedMainSubjects = {
      [userRole]: [
        {
          category: { _id: 'cat1' },
          subjects: [{ _id: 'sub1' }, { _id: 'sub2' }]
        }
      ]
    }

    expect(dataToUpdate.mainSubjects).toEqual(expectedMainSubjects)
  })

  it('should not update mainSubjects if categories[userRole] is undefined', () => {
    const categories = {
      tutor: [
        {
          category: { _id: 'cat2' },
          subjects: [{ _id: 'sub3' }]
        }
      ]
    }

    const userRole = undefined
    const dataToUpdate = {}

    if (categories?.[userRole]) {
      dataToUpdate.mainSubjects = {
        [userRole]: categories[userRole].map((item) => ({
          category: { _id: item.category._id },
          subjects: item.subjects.map((subject) => ({
            _id: subject._id
          }))
        }))
      }
    }

    expect(dataToUpdate.mainSubjects).toBeUndefined()
  })

  it('should populate mainSubjects when categories[userRole] is defined', () => {
    const categories = {
      tutor: [
        {
          category: { _id: 'cat1' },
          subjects: [{ _id: 'sub1' }, { _id: 'sub2' }]
        }
      ]
    }
    const dataToUpdate = {}

    if (categories?.[userRole]) {
      dataToUpdate.mainSubjects = {
        [userRole]: categories[userRole].map((item) => ({
          category: { _id: item.category._id },
          subjects: item.subjects.map((subject) => ({
            _id: subject._id
          }))
        }))
      }
    }

    expect(dataToUpdate).toEqual({
      mainSubjects: {
        tutor: [
          {
            category: { _id: 'cat1' },
            subjects: [{ _id: 'sub1' }, { _id: 'sub2' }]
          }
        ]
      }
    })
  })

  it('should render loader when loading is pending', () => {
    useAppSelector.mockImplementation((selector) =>
      selector({
        ...mockState,
        editProfile: {
          ...mockState.editProfile,
          loading: LoadingStatusEnum.Pending
        }
      })
    )
  
    renderWithProviders(<EditProfile />, {
      preloadedState: mockState
    })
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  }) 

  it('should return an empty object if no changes are detected', () => {
    const { result } = renderHook(() => useMemo(() => {
      const hasChanged = hasChanges(initialEditProfileStateMock, profileStateMock)
      if (!hasChanged) return {}
      return {}
    }, [profileStateMock, initialEditProfileStateMock]))

    expect(result.current).toEqual({})
  })

  it('should dispatch openAlert with success message when user updates profile', async () => {   
    const updateBtn = screen.getByText('editProfilePage.updateBtn')
    await waitFor(() => fireEvent.click(updateBtn))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'editProfilePage.profile.successMessage'
        })
      )
    })
  })

  it('updates notificationSettings when changed', () => {
    const changedFields = { notificationSettings: true }
    const dataToUpdate = {}

    Object.assign(dataToUpdate, {
      notificationSettings: changedFields.notificationSettings
        ? profileStateMock.notificationSettings
        : undefined
    })

    expect(dataToUpdate.notificationSettings).toEqual(profileStateMock.notificationSettings)
  })

  it('updates professionalBlock when changed', () => {
    const changedFields = { professionalBlock: true }
    const dataToUpdate = {}

    Object.assign(dataToUpdate, {
      professionalBlock: changedFields.professionalBlock
        ? profileStateMock.professionalBlock
        : undefined
    })

    expect(dataToUpdate.professionalBlock).toEqual(profileStateMock.professionalBlock)
  })

  it('does not update fields that are not changed', () => {
    const changedFields = {}
    const dataToUpdate = {}

    Object.assign(dataToUpdate, {
      professionalBlock: changedFields.professionalBlock
        ? profileStateMock.professionalBlock
        : undefined
    })

    expect(dataToUpdate).toEqual({})
  })

  it('should delete videoLink if unchanged after clicking update', () => {
    const changes = clickUpdateAndGetChanges({})
    expect(changes).not.toHaveProperty('videoLink')
  })

  it('should delete notificationSettings if unchanged after clicking update', () => {
    const changes = clickUpdateAndGetChanges({})
    expect(changes).not.toHaveProperty('notificationSettings')
  })

  it('should delete professionalBlock if unchanged after clicking update', () => {
    const changes = clickUpdateAndGetChanges({})
    expect(changes).not.toHaveProperty('professionalBlock')
  })

  it('should delete aboutStudent if unchanged after clicking update', () => {
    const changes = clickUpdateAndGetChanges({})
    expect(changes).not.toHaveProperty('aboutStudent')
  })

  it('should add photo if hasPhotoChanged is true after clicking update', () => {
    const changes = clickUpdateAndGetChanges({ photo: 'new-photo-url.jpg' })
    expect(changes).toHaveProperty('photo', 'new-photo-url.jpg')
  })
})

describe('mapMainSubjects', () => {
  const mockCategories = {
    [UserRoleEnum.Tutor]: [
      {
        category: { _id: 'cat1', name: 'Category 1' },
        subjects: [
          { _id: 'sub1', name: 'Subject 1' },
          { _id: 'sub2', name: 'Subject 2' }
        ]
      }
    ],
    [UserRoleEnum.Student]: [
      {
        category: { _id: 'cat2', name: 'Category 2' },
        subjects: [{ _id: 'sub3', name: 'Subject 3' }]
      }
    ]
  }

  it('should return the mapped mainSubjects for a valid userRole', () => {
    const result = mapMainSubjects(mockCategories, UserRoleEnum.Tutor)
    expect(result).toEqual({
      [UserRoleEnum.Tutor]: [
        {
          category: { _id: 'cat1' },
          subjects: [{ _id: 'sub1' }, { _id: 'sub2' }]
        }
      ]
    })
  })
})
