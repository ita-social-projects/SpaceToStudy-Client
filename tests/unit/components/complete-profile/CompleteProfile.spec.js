import { screen, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CompleteProfile from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'

const badRoute = '/tutor/myProfile'
const mockData = {}

describe('CompleteProfile test', () => {
  it('Check button less or more', () => {
    render(
      <MemoryRouter initialEntries={ [badRoute] }>
        <CompleteProfile data={ mockData } profileItems={ profileItems } />
      </MemoryRouter>
    )
    const lessOrMoreButton = screen.getByTestId('showOrHide')
    const moreIcon = screen.getByTestId('icon-more')
    expect(moreIcon).toBeInTheDocument()

    fireEvent.click(lessOrMoreButton)

    const lessIcon = screen.getByTestId('icon-less')
    expect(lessIcon).toBeInTheDocument()
  })
})
