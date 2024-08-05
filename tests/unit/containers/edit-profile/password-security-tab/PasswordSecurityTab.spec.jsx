import { vi } from 'vitest'
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { renderWithProviders, TestSnackbar } from '~tests/test-utils'
import PasswordSecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'

const userDataMock = {
  _id: 123456
}

vi.mock('~/services/auth-service', () => ({
  AuthService: {
    changePassword: vi.fn()
  }
}))

const renderWithMockData = () => {
  renderWithProviders(
    <TestSnackbar>
      <PasswordSecurityTab />
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

describe('PasswordSecurityTab', () => {
  beforeEach(() => {
    renderWithMockData()
  })

  it('renders title and description', () => {
    const title = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.title'
    )
    const description = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.subTitle'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('checks if ConfirmDialog is open when deactivate account button is clicked', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )

    fireEvent.click(deactivateAccountButton)

    const deactivateTitle = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    expect(deactivateTitle).toBeInTheDocument()
  })

  it('checks if ConfirmDialog is closed when cancel button is clicked', async () => {
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
