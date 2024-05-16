import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react'
import PasswordSecurityTab from '~/containers/edit-profile/security-tab/PasswordSecurityTab'

const changeInputValue = (label, value) => {
  fireEvent.change(label, { target: { value } })
}

describe('PasswordSecurityTab', () => {
  beforeEach(() => {
    render(<PasswordSecurityTab />)
  })

  it('renders title and description', () => {
    const title = screen.getByText('editTutor.passwordSecurityTab.title')
    const description = screen.getByText(
      'editTutor.passwordSecurityTab.description'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('resets form when discard button is clicked', () => {
    const currentPasswordLabel = screen.getByLabelText(
      'editTutor.passwordSecurityTab.currentPassword'
    )
    const discardButtonText = screen.getByText('common.discard')

    changeInputValue(currentPasswordLabel, 'oldPassword')

    fireEvent.click(discardButtonText)

    expect(currentPasswordLabel).toHaveValue('')
  })

  it('updates state when form fields are changed', () => {
    const currentPasswordLabel = screen.getByLabelText(
      'editTutor.passwordSecurityTab.currentPassword'
    )

    changeInputValue(currentPasswordLabel, 'oldPassword')

    expect(currentPasswordLabel).toHaveValue('oldPassword')
  })

  it('checks is ConfirmDialog open when deactivate account button is clicked', () => {
    const deactivateAccountButton = screen.getByText(
      'editTutor.passwordSecurityTab.deactivateAccount'
    )

    fireEvent.click(deactivateAccountButton)

    const deactivateTitle = screen.getByText(
      'editTutor.passwordSecurityTab.deactivateTitle'
    )
    expect(deactivateTitle).toBeInTheDocument()
  })

  it('checks is ConfirmDialog closed when cancel button is clicked', async () => {
    const deactivateAccountButton = screen.getByText(
      'editTutor.passwordSecurityTab.deactivateAccount'
    )
    let deactivateTitle

    fireEvent.click(deactivateAccountButton)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    await waitForElementToBeRemoved(() => {
      deactivateTitle = screen.queryByText(
        'editTutor.passwordSecurityTab.deactivateTitle'
      )
      return deactivateTitle
    })

    expect(deactivateTitle).not.toBeInTheDocument()
  })
})