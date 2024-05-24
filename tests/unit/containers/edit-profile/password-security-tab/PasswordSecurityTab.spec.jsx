import {
  screen,
  fireEvent,
  // waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import {
  renderWithProviders,
  // mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import PasswordSecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'

export const userDataMock = {
  _id: 123456
}

// import { URLs } from '~/constants/request'

// const openModal = vi.fn()

const changeInputValue = (label, value) => {
  fireEvent.change(label, { target: { value } })
}

describe('PasswordSecurityTab', () => {
  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <PasswordSecurityTab user={userDataMock} />
      </TestSnackbar>
    )
  })

  // it('should open login dilog after positive response', async () => {
  //   mockAxiosClient
  //     .onPatch(`${URLs.auth.changePassword}/${userDataMock}`)
  //     .reply(200)
  //   const currentPasswordInput = screen.getByLabelText(
  //     /editProfilePage.profile.passwordSecurityTab.currentPassword/i
  //   )
  //   const passwordInput = screen.getByLabelText(
  //     /editProfilePage.profile.passwordSecurityTab.newPassword/i
  //   )
  //   const confirmPasswordInput = screen.getByLabelText(
  //     /editProfilePage.profile.passwordSecurityTab.retypePassword/i
  //   )
  //   const button = screen.getByText(
  //     'editProfilePage.profile.passwordSecurityTab.savePassword'
  //   )

  //   fireEvent.change(currentPasswordInput, { target: { value: '12345qwert' } })
  //   fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
  //   fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })

  //   await waitFor(() => {
  //     fireEvent.click(button)
  //   })
  //   const snackbar = await screen.findByText('editProfilePage.profile.successMessage')
  //   expect(snackbar).toHaveBeenCalled()
  // })

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
    const currentPasswordLabel = screen.getByLabelText(
      'editProfilePage.profile.passwordSecurityTab.currentPassword'
    )
    const discardButtonText = screen.getByText('common.discard')

    changeInputValue(currentPasswordLabel, 'oldPassword')

    fireEvent.click(discardButtonText)

    expect(currentPasswordLabel).toHaveValue('')
  })

  it('updates state when form fields are changed', () => {
    const currentPasswordLabel = screen.getByLabelText(
      'editProfilePage.profile.passwordSecurityTab.currentPassword'
    )

    changeInputValue(currentPasswordLabel, 'oldPassword')

    expect(currentPasswordLabel).toHaveValue('oldPassword')
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
