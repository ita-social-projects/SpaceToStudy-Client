import { screen, fireEvent } from '@testing-library/react'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import {
  profileItemsTutor,
  profileItemsStudent
} from '~/components/profile-item/complete-profile.constants'
import { renderWithProviders } from '~tests/test-utils'

const badRoute = '/tutor/myProfile'
const mockData = {}

describe('CompleteProfile test', () => {
  it('Check button less or more for tutor', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockData}
        profileItems={profileItemsTutor}
        role='tutor'
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'tutor' } }
      }
    )
    const lessOrMoreButton = screen.getByTestId('showOrHide')
    const moreIcon = screen.getByTestId('icon-more')
    expect(moreIcon).toBeInTheDocument()

    fireEvent.click(lessOrMoreButton)

    const lessIcon = screen.getByTestId('icon-less')
    expect(lessIcon).toBeInTheDocument()
  })

  it('Check button less or more for student', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockData}
        profileItems={profileItemsStudent}
        role='student'
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'student' } }
      }
    )
    const lessOrMoreButton = screen.getByTestId('showOrHide')
    const moreIcon = screen.getByTestId('icon-more')
    expect(moreIcon).toBeInTheDocument()

    fireEvent.click(lessOrMoreButton)

    const lessIcon = screen.getByTestId('icon-less')
    expect(lessIcon).toBeInTheDocument()
  })
})
