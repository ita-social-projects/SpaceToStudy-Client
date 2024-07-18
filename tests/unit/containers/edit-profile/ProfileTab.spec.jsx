import { fireEvent, screen } from '@testing-library/react'
import { UserRoleEnum } from '~/types'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { renderWithProviders } from '~tests/test-utils'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: ({ description, title }) => (
    <div data-testid='title'>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  )
}))

vi.mock(
  '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm',
  () => ({
    default: ({ data, handleBlur, handleInputChange }) => (
      <div data-testid='form'>
        <input
          onBlur={handleBlur('firstName')}
          onChange={handleInputChange('firstName')}
          placeholder={'firstName'}
          required
          value={data.firstName}
        />
      </div>
    )
  })
)

const mockUseAppDispatch = vi.fn()
vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (value) => value
}))

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockUseAppDispatch
  }
})

const mockedUserProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  country: 'USA',
  city: 'New York',
  professionalSummary: 'Summary',
  nativeLanguage: 'English',
  videoLink: { [UserRoleEnum.Tutor]: 'link', [UserRoleEnum.Student]: '' },
  photo: 'photo_url',
  categories: { [UserRoleEnum.Tutor]: [], [UserRoleEnum.Student]: [] },
  education: 'Education',
  workExperience: 'Experience',
  scientificActivities: 'Activities',
  awards: 'Awards',
  isOfferStatusNotification: false,
  isChatNotification: false,
  isSimilarOffersNotification: false,
  isEmailNotification: false,
  loading: LoadingStatusEnum.Fulfilled,
  error: null,
  tabValidityStatus: {
    profileTab: true,
    professionalInfoTab: true,
    notificationTab: true
  }
}

const renderWithMockData = () => {
  renderWithProviders(<ProfileTab />, {
    preloadedState: {
      editProfile: mockedUserProfileData,
      appMain: {
        userId: '644e6b1778cc37f543f2f37c',
        userRole: UserRoleEnum.Student
      }
    }
  })
}

describe('ProfileTab', () => {
  it('should render correctly', () => {
    renderWithMockData()
    const title = screen.getByTestId('title')
    const form = screen.getByTestId('form')

    expect(title).toBeInTheDocument()
    expect(form).toBeInTheDocument()
  })

  it('should update store after input value change', async () => {
    renderWithMockData()
    const videoLinkInput = screen.getByPlaceholderText('firstName')
    fireEvent.change(videoLinkInput, { target: { value: 'NewValue' } })
    expect(mockUseAppDispatch).toHaveBeenCalled()
  })
})
