import { screen } from '@testing-library/react'
import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import { renderWithProviders } from '~tests/test-utils'
import { mockedCoop } from '~tests/unit/containers/my-cooperations/MyCooperations.spec.constants'

const preloadedState = {
  appMain: { userRole: 'tutor' },
  socket: { usersOnline: [] }
}

describe('CooperationCard component ', () => {
  it('should render card', () => {
    renderWithProviders(<CooperationCard cooperation={mockedCoop} />, {
      preloadedState
    })

    const level = screen.getByText(mockedCoop.proficiencyLevel)

    expect(level).toBeInTheDocument()
  })
})
