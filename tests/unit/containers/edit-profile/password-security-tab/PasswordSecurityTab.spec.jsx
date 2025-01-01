import { vi } from 'vitest'
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within
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

  it('renders title and description change password', () => {
    const title = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    const description = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateSubTitle'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders title and description deactivate account', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )

    fireEvent.click(deactivateAccountButton)

    const deactivateDescription = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
    )
    expect(deactivateDescription).toBeInTheDocument()
  })

  it('checks if ConfirmDialog is closed when cancel button is clicked', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    let deactivateDescription

    fireEvent.click(deactivateAccountButton)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    await waitForElementToBeRemoved(() => {
      deactivateDescription = screen.queryByText(
        'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
      )
      return deactivateDescription
    })

    expect(deactivateDescription).not.toBeInTheDocument()
  })
  it('should open the modal when clicking the Deactivate account button', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)

    const modal = screen.getByRole('dialog')
    const deactivateTitle = within(modal).getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    const deactivateDescription = within(modal).getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
    )
    expect(deactivateTitle).toBeInTheDocument()
    expect(deactivateDescription).toBeInTheDocument()
  })
  it('should render Deactivate and Cancel buttons in the modal', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)
  
    const deactivateButton = screen.getByText('editProfilePage.profile.passwordSecurityTab.deactivateBtn')
    const cancelButton = screen.getByText('common.cancel')
  
    expect(deactivateButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })  
  it('should close modal on Cancel button click and stays on Password & Security tab', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)
  
    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)
    
    const tabTitle = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.title'
    )
    expect(tabTitle).toBeInTheDocument()
  })
})
