import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { mockedCoop } from '~tests/unit/containers/my-cooperations/MyCooperations.spec.constants'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { StatusEnum } from '~/types'

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

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

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

  it('navigates to cooperation detail for Active status', async () => {
    const activeCoop = { ...mockedCoop, status: StatusEnum.Active }
    renderWithProviders(
      <CooperationContainer
        filterOptions={filterOptionsMock}
        items={[activeCoop]}
      />,
      { preloadedState }
    )

    const card = screen.getByText(activeCoop.offer.subject.name)
    userEvent.click(card)

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(`./${activeCoop._id}`)
    })
  })
})
