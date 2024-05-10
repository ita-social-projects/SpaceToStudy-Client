import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
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
    renderWithProviders(<ProfileTabForm {...props} />)
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
})

describe('ProfileGeneralTab without a user photo', () => {
  const propsWithoutPhoto = {
    ...props,
    data: {
      ...formDataMock,
      photo: null
    }
  }

  beforeEach(() => {
    renderWithProviders(<ProfileTabForm {...propsWithoutPhoto} />)
  })

  it('should display a default avatar icon if no photo is provided', () => {
    const avatarIcon = screen.getByTestId('PersonIcon')
    expect(avatarIcon).toBeInTheDocument()
  })
})
