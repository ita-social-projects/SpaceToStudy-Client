import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import PasswordSecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'
import { AuthService } from '~/services/auth-service'

import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const userDataMock = {
  _id: 123456
}

vi.mock('~/services/auth-service', () => ({
  AuthService: {
    changePassword: vi.fn()
  }
}))

const handleSubmit = vi.fn()

const changeInputValue = (label, value) => {
  fireEvent.change(label, { target: { value } })
}

const setupChangePasswordFields = () => {
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

  return {
    currentPasswordInput,
    passwordInput,
    confirmPasswordInput,
    saveButton
  }
}

describe('PasswordSecurityTab', () => {
  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <PasswordSecurityTab user={userDataMock} />
      </TestSnackbar>
    )
  })

  it('should save data after positive response', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.changePassword}/${userDataMock}`)
      .reply(200)

    const {
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      saveButton
    } = setupChangePasswordFields()

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
      .onPatch(`${URLs.auth.changePassword}/${userDataMock}`)
      .reply(400, {
        message: 'new password cannot be the same as the current one'
      })

    const {
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      saveButton
    } = setupChangePasswordFields()

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

  it('should do not save empty fields', async () => {
    const {
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      saveButton
    } = setupChangePasswordFields()

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

  it('renders title and description', () => {
    const title = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.title'
    )
    const description = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.description'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('resets form when discard button is clicked', () => {
    const { currentPasswordInput } = setupChangePasswordFields()

    const discardButtonText = screen.getByText('common.discard')

    changeInputValue(currentPasswordInput, 'oldPassword')

    fireEvent.click(discardButtonText)

    expect(currentPasswordInput).toHaveValue('')
  })

  it('updates state when form fields are changed', () => {
    const { currentPasswordInput } = setupChangePasswordFields()

    changeInputValue(currentPasswordInput, 'oldPassword')

    expect(currentPasswordInput).toHaveValue('oldPassword')
  })

  it('checks is ConfirmDialog open when deactivate account button is clicked', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )

    fireEvent.click(deactivateAccountButton)

    const deactivateTitle = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    expect(deactivateTitle).toBeInTheDocument()
  })

  it('checks is ConfirmDialog closed when cancel button is clicked', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    let deactivateTitle

    fireEvent.click(deactivateAccountButton)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    await waitForElementToBeRemoved(() => {
      deactivateTitle = screen.queryByText(
        'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
      )
      return deactivateTitle
    })

    expect(deactivateTitle).not.toBeInTheDocument()
  })
})
