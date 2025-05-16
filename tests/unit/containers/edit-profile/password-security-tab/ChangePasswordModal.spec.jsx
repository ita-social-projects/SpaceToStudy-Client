import { it, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import ChangePasswordModal from '~/containers/edit-profile/password-security-tab/change-password-modal/ChangePasswordModal'
import { AuthService } from '~/services/auth-service'
import { URLs } from '~/constants/request'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'

const userDataMock = {
  _id: 123456,
  currentPassword: '12345qwert!',
  anotherPassword: '12345qwertY!',
  shortPassword: '1q!',
  longPassword:
    '2231234123434324refsdfdsa32@!3245gdfg2231234123434324refsdfdsa32@!3245gdfg'
}

const handleSubmit = vi.fn()
const dispatch = vi.fn()

vi.mock('~/services/auth-service', () => ({
  AuthService: {
    changePassword: vi.fn()
  }
}))

describe('ChangePasswordModal', () => {
  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <ChangePasswordModal userId={userDataMock._id} />
      </TestSnackbar>,
      {
        preloadedState: {
          appMain: {
            userId: userDataMock._id,
            userStatus: 'active'
          }
        }
      }
    )
  })

  it('should save data after positive response and display success message', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.changePassword}/${userDataMock._id}`)
      .reply(200)

    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(passwordInput, {
      target: { value: userDataMock.anotherPassword }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: userDataMock.anotherPassword }
    })

    fireEvent.click(saveButton)

    const confirmButton = screen.getByText('common.yes')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(AuthService.changePassword).toHaveBeenCalledWith(
        userDataMock._id,
        {
          currentPassword: userDataMock.currentPassword,
          password: userDataMock.anotherPassword
        }
      )
    })
    const handleResponse = () => {
      dispatch(
        openAlert({
          severity: snackbarVariants.success,
          message: 'editProfilePage.profile.successMessage'
        })
      )
    }
    const success = {
      code: 204,
      message: 'editProfilePage.profile.successMessage'
    }

    handleResponse(success)

    expect(dispatch).toHaveBeenCalledWith(
      openAlert({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    )
  })

  it('should not save data after negative response', () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.changePassword}/${userDataMock._id}`)
      .reply(400, {
        message: 'new password cannot be the same as the current one'
      })

    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(passwordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })

    fireEvent.click(saveButton)

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('should not save empty fields', () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: '' }
    })
    fireEvent.change(passwordInput, {
      target: { value: '' }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: '' }
    })

    fireEvent.click(saveButton)

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(currentPasswordInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })

  it('should show visibility icon', () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    const visibilityOffIcon = visibilityOffIcons[0]
    fireEvent.click(visibilityOffIcon)

    const visibilityIcons = screen.getAllByTestId('VisibilityIcon')
    const visibilityIcon = visibilityIcons[0]

    expect(visibilityIcon).toBeInTheDocument()
    expect(visibilityOffIcon).not.toBeInTheDocument()
  })

  it('resets form when discard button is clicked', () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const discardButton = screen.getByText('common.cancel')

    fireEvent.change(passwordInput, { target: { value: 'oldPassword' } })
    fireEvent.click(discardButton)

    expect(currentPasswordInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })

  it('updates state when form fields are changed', () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    fireEvent.change(currentPasswordInput, { target: { value: 'oldPassword' } })
    expect(currentPasswordInput).toHaveValue('oldPassword')
  })

  it('should display an error message for incorrect current password', async () => {
    AuthService.changePassword.mockImplementation(() => {
      return Promise.reject({
        response: {
          status: 400,
          data: {
            code: 'WRONG_CURRENT_PASSWORD',
            message: 'Wrong current password'
          }
        }
      })
    })

    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )
    fireEvent.change(currentPasswordInput, {
      target: { value: 'wrongPassword1!' }
    })
    fireEvent.change(screen.getByLabelText(/newPassword/i), {
      target: { value: userDataMock.anotherPassword }
    })
    fireEvent.change(screen.getByLabelText(/retypePassword/i), {
      target: { value: userDataMock.anotherPassword }
    })

    fireEvent.click(saveButton)

    const confirmButton = await screen.findByText(/common.yes/i)

    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(
        screen.getByText(/common.errorMessages.incorrectCurrentPassword/i)
      ).toBeInTheDocument()
      expect(currentPasswordInput).toHaveValue('')
    })
  })

  it('should show error when new password matches current password', () => {
    const currentPasswordInput = screen.getByLabelText(/currentPassword/i)
    const passwordInput = screen.getByLabelText(/newPassword/i)
    const confirmPasswordInput = screen.getByLabelText(/retypePassword/i)
    const saveButton = screen.getByText(/savePassword/i)

    fireEvent.change(currentPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(passwordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })

    fireEvent.click(saveButton)

    expect(
      screen.getByText(/common.errorMessages.currentAndNewPasswordsMatch/i)
    ).toBeInTheDocument()
  })

  it('should show error when new password does not match re-typed password', () => {
    const currentPasswordInput = screen.getByLabelText(/currentPassword/i)
    const passwordInput = screen.getByLabelText(/newPassword/i)
    const confirmPasswordInput = screen.getByLabelText(/retypePassword/i)
    const saveButton = screen.getByText(/savePassword/i)

    fireEvent.change(currentPasswordInput, {
      target: { value: 'qww9876*0-' }
    })
    fireEvent.change(passwordInput, {
      target: { value: 'ABCabc123' }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'ABCabc1234' }
    })

    fireEvent.click(saveButton)

    expect(
      screen.getByText(/common.errorMessages.passwordsDontMatch/i)
    ).toBeInTheDocument()
    expect(confirmPasswordInput.parentElement.className).toMatch(
      /\bMui-error\b/
    )
  })

  it('should throw an error when password is too weak', async () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: 'ABCDabcdef' }
    })
    fireEvent.change(passwordInput, {
      target: { value: 'ABCDabcdef' }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'ABCDabcdef' }
    })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(
        screen.getByText(/common.errorMessages.passwordComplex/i)
      ).toBeInTheDocument()
    })
  })

  it('should show error when new password is too short', () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(passwordInput, {
      target: { value: userDataMock.shortPassword }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: userDataMock.shortPassword }
    })

    fireEvent.click(saveButton)

    expect(
      screen.getByText(/common.errorMessages.passwordLength/i)
    ).toBeInTheDocument()
  })

  it('should show error when new password is too long', () => {
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const passwordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.newPassword/i
    )
    const confirmPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.retypePassword/i
    )
    const saveButton = screen.getByText(
      /editProfilePage.profile.passwordSecurityTab.savePassword/i
    )

    fireEvent.change(currentPasswordInput, {
      target: { value: userDataMock.currentPassword }
    })
    fireEvent.change(passwordInput, {
      target: { value: userDataMock.longPassword }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: userDataMock.longPassword }
    })

    fireEvent.click(saveButton)

    expect(
      screen.getByText(/common.errorMessages.passwordLength/i)
    ).toBeInTheDocument()
  })
  it('should display an error message at entering ONLY special characters', async () => {
    const testData = ['!@#$%^&*()', '********__)))))))))))*&^%$$']
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const newPasswordInput = screen.getByLabelText(/newPassword/i)
    for (const data of testData) {
      fireEvent.change(currentPasswordInput, {
        target: { value: data }
      })
      fireEvent.blur(currentPasswordInput)
      fireEvent.change(newPasswordInput, {
        target: { value: data }
      })
      fireEvent.blur(newPasswordInput)

      await waitFor(() => {
        expect(
          screen.getByText(/common.errorMessages.passwordComplex/i)
        ).toBeInTheDocument()
      })
      expect(currentPasswordInput.parentElement.className).toMatch(
        /\bMui-error\b/
      )
      expect(newPasswordInput.parentElement.className).toMatch(/\bMui-error\b/)
    }
  })
  it('should display an error message at entering ONLY numeric values', async () => {
    const testData = ['01234567890', '888888888', '380502324678']
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const newPasswordInput = screen.getByLabelText(/newPassword/i)
    for (const data of testData) {
      fireEvent.change(currentPasswordInput, {
        target: { value: data }
      })
      fireEvent.blur(currentPasswordInput)
      fireEvent.change(newPasswordInput, {
        target: { value: data }
      })
      fireEvent.blur(newPasswordInput)
      await waitFor(() => {
        expect(
          screen.getByText(/common.errorMessages.passwordComplex/i)
        ).toBeInTheDocument()
      })
      expect(currentPasswordInput.parentElement.className).toMatch(
        /\bMui-error\b/
      )
      expect(newPasswordInput.parentElement.className).toMatch(/\bMui-error\b/)
    }
  })
  it('should display an error message at leaving fields empty', async () => {
    const testData = ''
    const currentPasswordInput = screen.getByLabelText(
      /editProfilePage.profile.passwordSecurityTab.currentPassword/i
    )
    const newPasswordInput = screen.getByLabelText(/newPassword/i)
    fireEvent.change(currentPasswordInput, {
      target: { value: testData }
    })
    fireEvent.blur(currentPasswordInput)
    fireEvent.change(newPasswordInput, {
      target: { value: testData }
    })
    fireEvent.blur(newPasswordInput)

    await waitFor(() => {
      const errorMessage = screen.getAllByText(
        /common.errorMessages.emptyField/i
      )
      expect(errorMessage[0]).toBeInTheDocument()
    })
    await waitFor(() => {
      const errorMessage = screen.getAllByText(
        /common.errorMessages.emptyField/i
      )
      expect(errorMessage[1]).toBeInTheDocument()
    })
    expect(currentPasswordInput.parentElement.className).toMatch(
      /\bMui-error\b/
    )
    expect(newPasswordInput.parentElement.className).toMatch(/\bMui-error\b/)
  })
})
