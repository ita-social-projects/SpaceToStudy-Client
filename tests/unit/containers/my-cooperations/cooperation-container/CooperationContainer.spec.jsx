import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { mockedCoop } from '~tests/unit/containers/my-cooperations/MyCooperations.spec.constants'

const filterOptionsMock = {
  filters: {
    sort: 'name',
    search: '',
    status: '',
    view: 'grid'
  }
}

const preloadedState = {
  appMain: { userRole: 'tutor' },
  socket: { usersOnline: [] }
}

describe('CooperationContainer component ', () => {
  it('should render card in container', () => {
    renderWithProviders(
      <CooperationContainer
        filterOptions={filterOptionsMock}
        items={[mockedCoop]}
      />,
      { preloadedState }
    )

    const level = screen.getByText(mockedCoop.proficiencyLevel)

    expect(level).toBeInTheDocument()
  })
})
