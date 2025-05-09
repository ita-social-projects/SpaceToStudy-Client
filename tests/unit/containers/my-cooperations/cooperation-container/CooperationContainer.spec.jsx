import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { StatusEnum } from '~/types'
import userEvent from '@testing-library/user-event'
import { mockedCooperations } from '~tests/test-constants'

const mockedCoop = mockedCooperations.items[0]

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

const mockCloseModal = vi.fn()
const mockOpenModal = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: mockCloseModal,
      openModal: mockOpenModal
    })
  }
})

describe('CooperationContainer component ', () => {
  afterEach(() => {
    navigateMock.mockClear()
  })

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

    const card = screen.getByText(activeCoop.subject.name)
    await userEvent.click(card)

    expect(navigateMock).toHaveBeenCalledWith(`./${activeCoop._id}`)
  })

  it('navigates to cooperation detail for Active status', async () => {
    const activeCoop = { ...mockedCoop, status: StatusEnum.RequestToClose }
    renderWithProviders(
      <CooperationContainer
        filterOptions={filterOptionsMock}
        items={[activeCoop]}
      />,
      { preloadedState }
    )

    const card = screen.getByText(activeCoop.subject.name)
    await userEvent.click(card)

    expect(navigateMock).toHaveBeenCalledWith(`./${activeCoop._id}`)
  })

  it('opens modal for Pending status', async () => {
    const pendingCoop = { ...mockedCoop, status: StatusEnum.Pending }

    renderWithProviders(
      <CooperationContainer
        filterOptions={filterOptionsMock}
        items={[pendingCoop]}
      />,
      { preloadedState }
    )

    const card = screen.getByText(pendingCoop.subject.name)
    await userEvent.click(card)

    expect(mockOpenModal).toHaveBeenCalled()
  })
})
