import { screen, render } from '@testing-library/react'
import { vi } from 'vitest'
import CooperationCompletion from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion'
import { UserRoleEnum } from '~/types'

describe('CooperationCompletion Component', () => {
  const mockOnCloseCooperation = vi.fn()

  it('should render the access selection dropdown when userRole is Tutor', () => {
    render(
      <CooperationCompletion
        onCloseCooperation={mockOnCloseCooperation}
        userRole={UserRoleEnum.Tutor}
      />
    )

    const accessTitle = screen.getByText(
      'cooperationsPage.cooperationDetails.accessTitle'
    )
    expect(accessTitle).toBeInTheDocument()

    const appSelect = screen.getByRole('combobox')
    expect(appSelect).toBeInTheDocument()
  })
})
