import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import StudentProfile from '~/pages/student-profile/StudentProfile'

describe('StudentProfile component', () => {
  beforeEach(() => {
    renderWithProviders(<StudentProfile />)
  })

  it('Should render StudentProfile placeholder', () => {
    expect(
      screen.getByText('StudentProfile Page Placeholder')
    ).toBeInTheDocument()
  })
})
