import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { ProfileProvider } from '~/context/profile-context'
import { imageResize } from '~/utils/image-resize'
import { UserRoleEnum } from '~/types'
import ProfileGeneralTab from '~/containers/edit-profile/profile-tab/profile-tabs/profile-general-tab/ProfileGeneralTab'

vi.mock('~/utils/image-resize')

vi.mock('~/context/profile-context', async () => {
  const actual = await vi.importActual('~/context/profile-context')
  return {
    ...actual,
    useProfileContext: () => ({
      profileData: {
        generalData: { data: initialContextValuesMock }
      },
      handleProfileData: mockHandleProfileData
    })
  }
})

const userDataMock = {
  _id: 1,
  role: [UserRoleEnum.Tutor],
  firstName: '',
  lastName: '',
  mainSubjects: { student: [], tutor: [] },
  nativeLanguage: null,
  address: { country: null, city: null },
  photo: 'photo.png',
  videoLink: { student: '', tutor: '' }
}

const initialContextValuesMock = {
  ...userDataMock,
  mainSubjects: [],
  videoLink: null
}

const mockHandleProfileData = vi.fn()

describe('ProfileGeneralTab', () => {
  URL.createObjectURL = vi.fn().mockReturnValue('photo')

  beforeEach(() => {
    renderWithProviders(
      <ProfileProvider initialValues={initialContextValuesMock}>
        <ProfileGeneralTab user={userDataMock} />
      </ProfileProvider>
    )
  })

  afterAll(() => {
    URL.createObjectURL.mockReset()
  })

  it('should handle the language input change', () => {
    const newLanguageValue = 'Ukrainian'
    const languageField = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )

    fireEvent.click(languageField)
    fireEvent.change(languageField, { target: { value: newLanguageValue } })

    const option = screen.getByText(newLanguageValue)
    fireEvent.click(option)

    expect(languageField.value).toBe(newLanguageValue)
  })

  it('should handle photo deletion', () => {
    const removePhotoBtn = screen.getByRole('button', { name: 'common.remove' })
    fireEvent.click(removePhotoBtn)

    expect(mockHandleProfileData).toHaveBeenCalledWith(
      expect.objectContaining({ photo: null })
    )
  })

  it('should handle adding a photo', async () => {
    const file = new File(['photo'], 'photo.jpeg', { type: 'image/jpeg' })
    const imageSrc = 'photo.jpeg'
    imageResize.mockResolvedValue(imageSrc)

    const uploadPhotoBtn = screen.getByLabelText(
      'editProfilePage.profile.generalTab.uploadTitle'
    )

    await waitFor(() =>
      fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })
    )

    const photo = { src: 'photo.jpeg', name: 'photo.jpeg' }
    expect(mockHandleProfileData).toHaveBeenCalledWith(
      expect.objectContaining({ photo })
    )
  })

  it('should display an error message when adding an invalid photo', async () => {
    const file = new File(['photo'], 'photo.jpeg', { type: 'image/jpeg' })
    Object.defineProperty(file, 'size', { value: 55_000_000 })

    const uploadPhotoBtn = screen.getByLabelText(
      'editProfilePage.profile.generalTab.uploadTitle'
    )

    await waitFor(() =>
      fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })
    )

    const error = screen.queryByText('becomeTutor.photo.fileSizeError')
    expect(error).toBeInTheDocument()
  })
})

describe('ProfileGeneralTab without a user photo', () => {
  beforeEach(() => {
    initialContextValuesMock.photo = null
    renderWithProviders(
      <ProfileProvider initialValues={initialContextValuesMock}>
        <ProfileGeneralTab user={userDataMock} />
      </ProfileProvider>
    )
  })

  it('should display a default avatar icon if no photo is provided', () => {
    const avatarIcon = screen.getByTestId('PersonIcon')
    expect(avatarIcon).toBeInTheDocument()
  })
})
