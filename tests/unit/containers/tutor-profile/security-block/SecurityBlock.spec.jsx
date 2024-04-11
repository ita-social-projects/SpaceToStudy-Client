import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react'
import SecurityBlock from '~/containers/tutor-profile/security-block/SecurityBlock'

const changeInputValue = (label, value) => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

describe('SecurityBlock', () => {
  beforeEach(() => {
    render(<SecurityBlock />)
  })

  it('renders title and description', () => {
    expect(
      screen.getByText('editTutor.passwordSecurityTab.title')
    ).toBeInTheDocument()
    expect(
      screen.getByText('editTutor.passwordSecurityTab.description')
    ).toBeInTheDocument()
  })

  it('resets form when discard button is clicked', () => {
    changeInputValue(
      'editTutor.passwordSecurityTab.currentPassword',
      'oldPassword'
    )
    changeInputValue('editTutor.passwordSecurityTab.newPassword', 'newPassword')
    changeInputValue(
      'editTutor.passwordSecurityTab.retypePassword',
      'newPassword'
    )

    fireEvent.click(screen.getByText('common.discard'))

    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.currentPassword')
    ).toHaveValue('')
    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.newPassword')
    ).toHaveValue('')
    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.retypePassword')
    ).toHaveValue('')
  })

  it('updates state when form fields are changed', () => {
    changeInputValue(
      'editTutor.passwordSecurityTab.currentPassword',
      'oldPassword'
    )
    changeInputValue('editTutor.passwordSecurityTab.newPassword', 'newPassword')
    changeInputValue(
      'editTutor.passwordSecurityTab.retypePassword',
      'newPassword'
    )

    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.currentPassword')
    ).toHaveValue('oldPassword')
    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.newPassword')
    ).toHaveValue('newPassword')
    expect(
      screen.getByLabelText('editTutor.passwordSecurityTab.retypePassword')
    ).toHaveValue('newPassword')
  })

  it('opens ConfirmDialog when deactivate account button is clicked', () => {
    fireEvent.click(
      screen.getByText('editTutor.passwordSecurityTab.deactivateAccount')
    )
    expect(
      screen.getByText('editTutor.passwordSecurityTab.deactivateTitle')
    ).toBeInTheDocument()
  })

  it('closes ConfirmDialog when cancel button is clicked', async () => {
    fireEvent.click(
      screen.getByText('editTutor.passwordSecurityTab.deactivateAccount')
    )
    fireEvent.click(screen.getByText('common.cancel'))

    await waitForElementToBeRemoved(() =>
      screen.queryByText('editTutor.passwordSecurityTab.deactivateTitle')
    )
  })
})
