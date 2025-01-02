import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { UserRoleEnum } from '~/types'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { renderWithProviders } from '~tests/test-utils'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'
import { expect, vi } from 'vitest'

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
        <input
          onBlur={handleBlur('lastName')}
          onChange={handleInputChange('lastName')}
          placeholder={'lastName'}
          required
          value={data.lastName}
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
  photo: {
    src: 'url',
    name: 'profile_photo'
  },
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

  it('should render correctly for a Tutor role', () => {
    renderWithProviders(<ProfileTab />, {
      preloadedState: {
        editProfile: mockedUserProfileData,
        appMain: {
          userId: '644e6b1778cc37f543f2f37c',
          userRole: UserRoleEnum.Tutor
        }
      }
    })

    const title = screen.getByTestId('title')
    expect(title).toBeInTheDocument()
    expect(screen.getByPlaceholderText('firstName')).toHaveValue('John')
  })

  it('should handle non-input value changes', () => {
    renderWithMockData()
    const dropdown = screen.getByTestId('form')
    fireEvent.click(dropdown)

    expect(mockUseAppDispatch).toHaveBeenCalled()
  })

  it('should set photo to empty string if photo is undefined', () => {
    const mockedDataWithoutPhoto = {
      ...mockedUserProfileData,
      photo: null
    }

    renderWithProviders(<ProfileTab />, {
      preloadedState: {
        editProfile: mockedDataWithoutPhoto,
        appMain: {
          userId: '644e6b1778cc37f543f2f37c',
          userRole: UserRoleEnum.Student
        }
      }
    })

    const photoInput = screen.queryByDisplayValue('')
    expect(photoInput).not.toBeInTheDocument()
  })

  it('should place cursor in the "First name" field when clicked', async() => {
    renderWithMockData()
    const firstNameInput = screen.getByPlaceholderText('firstName')
    await userEvent.click(firstNameInput)
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toHaveFocus()
  })

  it('should place cursor in the "Last name" field when clicked', async () => {
    renderWithMockData();
  
    const lastNameInput = screen.getByPlaceholderText('lastName');
    expect(lastNameInput).toBeInTheDocument();
    expect(document.activeElement).not.toBe(lastNameInput);
  
    await userEvent.click(lastNameInput);
  
    expect(document.activeElement).toBe(lastNameInput);
    expect(lastNameInput).toHaveFocus()
  });
  
})