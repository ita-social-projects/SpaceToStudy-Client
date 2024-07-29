import { vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import ChangePasswordModal from '~/containers/edit-profile/password-security-tab/change-password-modal/ChangePasswordModal'
import { AuthService } from '~/services/auth-service'
import { URLs } from '~/constants/request'

const userDataMock = {
  _id: 123456
}

const handleSubmit = vi.fn()

vi.mock('~/services/auth-service', () => ({
  AuthService: {
    changePassword: vi.fn()
  }
}))

const renderChangePasswordModal = () => {
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
}

describe('ChangePasswordModal', () => {
  beforeEach(() => {
    renderChangePasswordModal()
  })

  it('should save data after positive response', async () => {
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
      target: { value: '12345qwert' }
    })
    fireEvent.change(passwordInput, {
      target: { value: '12345qwertY' }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: '12345qwertY' }
    })

    await waitFor(() => {
      fireEvent.click(saveButton)
    })

    const confirmButton = screen.getByText('common.yes')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(AuthService.changePassword).toHaveBeenCalledWith(
        userDataMock._id,
        {
          password: '12345qwertY',
          currentPassword: '12345qwert'
        }
      )
    })
  })

  it('should not save data after negative response', async () => {
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
      target: { value: '12345qwertY' }
    })
    fireEvent.change(passwordInput, {
      target: { value: '12345qwertY' }
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: '12345qwertY' }
    })

    await waitFor(() => {
      fireEvent.click(saveButton)
    })

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

  it('should show visibility icon', async () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    const visibilityOffIcon = visibilityOffIcons[0]
    fireEvent.click(visibilityOffIcon)

    const visibilityIcons = screen.getAllByTestId('VisibilityIcon')
    const visibilityIcon = visibilityIcons[0]
    await waitFor(() => {
      expect(visibilityIcon).toBeInTheDocument()
      expect(visibilityOffIcon).not.toBeInTheDocument()
    })
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
})
