import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders, TestSnackbar } from '~tests/test-utils'
import { imageResize } from '~/utils/image-resize'
import ProfileTabForm from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm'
import { formDataMock } from '~tests/unit/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.spec.constants'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

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

  it('should clear the selected native language and change the value', async () => {
    const languageField = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )
    const clearButton = screen.getByLabelText('Clear')
    await userEvent.click(clearButton)
    expect(languageField).toHaveValue('')

    await userEvent.click(languageField)
    const arabicOption = await screen.findByText('Arabic')
    await userEvent.click(arabicOption)

    expect(languageField).toHaveValue('Arabic')
  })

  it('should add only one language to "Your native language" field', () => {
    const languages = [
      'English',
      'Ukrainian',
      'Polish',
      'German',
      'French',
      'Spanish',
      'Arabic'
    ]
    const languageField = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )
    expect(languageField).toBeInTheDocument()

    fireEvent.click(languageField)

    for (const lang of languages) {
      fireEvent.change(languageField, { target: { value: lang } })
      const option = screen.getByText(lang)
      fireEvent.click(option, { ctrlKey: true })
    }

    expect(languageField).toHaveValue('Arabic')
  })

  it('should not allow typing more than 200 characters in "Professional headline"', async () => {
    const longText = 'a'.repeat(250)
    const input = screen
      .getAllByRole('textbox')
      .find((el) => el.getAttribute('maxlength') === '200')

    await userEvent.type(input, longText)

    expect(input).toHaveValue('a'.repeat(200))
  })

  it("should allow searching for native language in the 'Your native language' field", () => {
    const partialInput = 'Ukra'
    const expectedLanguage = 'Ukrainian'

    const languageField = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )

    fireEvent.click(languageField)
    fireEvent.change(languageField, { target: { value: partialInput } })

    const filteredOption = screen.getByText(expectedLanguage)
    expect(filteredOption).toBeInTheDocument()

    fireEvent.click(filteredOption)
    expect(handleNonInputValueChange).toHaveBeenCalledWith(
      'nativeLanguage',
      expectedLanguage
    )
  })

  it('should handle photo deletion', () => {
    const removePhotoBtn = screen.getByRole('button', { name: 'common.remove' })
    fireEvent.click(removePhotoBtn)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('photo', '')
  })

  it('should handle adding a photo', async () => {
    const file = new File(['photo'], 'photo.jpeg', { type: 'image/jpeg' })
    const imageSrc = 'photo.jpeg'
    imageResize.mockResolvedValue(imageSrc)

    const uploadPhotoBtn = screen.getByLabelText(
      'editProfilePage.profile.generalTab.uploadTitle'
    )

    fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })

    const photo = { src: imageSrc, name: imageSrc }
    await waitFor(() => {
      expect(handleNonInputValueChange).toHaveBeenCalledWith('photo', photo)
    })
  })

  it('should display an error message when adding an invalid photo', () => {
    const file = new File(['photo'], 'photo.jpeg', { type: 'image/jpeg' })
    Object.defineProperty(file, 'size', { value: 55_000_000 })

    const uploadPhotoBtn = screen.getByLabelText(
      'editProfilePage.profile.generalTab.uploadTitle'
    )

    fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })

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

    fireEvent.change(uploadPhotoBtn, { target: { files: [file] } })

    const resizeError = await screen.findByText('becomeTutor.photo.resizeImage')
    expect(resizeError).toBeInTheDocument()
  })

  it('should throw an error when invalid domain name is provided', () => {
    const testData = [
      'https://www.tiktok.com/@anatoliyvolodumur3/video/7434608027925335351',
      'https://www.youtube.co/shorts/7fTHD07Q9Pw',
      'https://ww.youtube.com/shorts/7fTHD07Q9Pw',
      'https://www.yutube.com/shorts/7fTHD07Q9Pw'
    ]

    const find = screen.getByPlaceholderText('youtube.com/my-video')

    expect(find).toBeInTheDocument()

    testData.forEach(async (item) => {
      await userEvent.clear(find)
      await userEvent.type(find, item)
      await waitFor(() => {
        expect(
          screen.getByText(/common.errorMessages.youtubeLink/i)
        ).toBeInTheDocument()
      })
    })
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
