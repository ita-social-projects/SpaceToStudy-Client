import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import EditProfile from '~/pages/edit-profile/EditProfile'

describe('EditProfile', () => {
  beforeEach(() => {
    renderWithProviders(<EditProfile />)
  })

  it('should render EditProfile with content', () => {
    const editProfileText = screen.getByText('EditProfile Page Placeholder')
    expect(editProfileText).toBeInTheDocument()
  })
})
