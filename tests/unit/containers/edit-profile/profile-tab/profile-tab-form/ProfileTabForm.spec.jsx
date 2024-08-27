import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders, TestSnackbar } from '~tests/test-utils'
import { imageResize } from '~/utils/image-resize'
import ProfileTabForm from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm'
import { formDataMock } from '~tests/unit/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.spec.constants'

vi.mock('~/utils/image-resize')

const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const handleBlur = vi.fn()

const props = {
  data: formDataMock,
  errors: [],
  handleInputChange,
  handleNonInputValueChange,
  handleBlur
}

describe('ProfileTabForm', () => {
  URL.createObjectURL = vi.fn().mockReturnValue('photo')

  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <ProfileTabForm {...props} />
      </TestSnackbar>
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
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

    expect(handleNonInputValueChange).toHaveBeenCalledWith('photo', null)
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

    const photo = { src: imageSrc, name: imageSrc }
    expect(handleNonInputValueChange).toHaveBeenCalledWith('photo', photo)
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

  it('should display an error message when image resizing fails', async () => {
    const file = new File(['photo'], 'photo.jpeg', { type: 'image/jpeg' })
    const errorMessage = 'Image resizing failed'
    imageResize.mockRejectedValue(new Error(errorMessage))

    const uploadPhotoBtn = screen.getByLabelText(
      'editProfilePage.profile.generalTab.uploadTitle'
    )

    await waitFor(() =>
      fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })
    )

    const resizeError = await screen.findByText('becomeTutor.photo.resizeImage')
    expect(resizeError).toBeInTheDocument()
  })
})

describe('ProfileGeneralTab without a user photo', () => {
  const propsWithoutPhoto = {
    ...props,
    data: {
      ...formDataMock,
      photo: null,
      firstName: 'John',
      lastName: 'Doe'
    }
  }

  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <ProfileTabForm {...propsWithoutPhoto} />
      </TestSnackbar>
    )
  })

  it('should render initials on avatar if no photo is provided', () => {
    const avatarElement = screen.getByText('JD')

    expect(avatarElement).toBeInTheDocument()
  })
})
