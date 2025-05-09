import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable.tsx'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { renderWithProviders } from '~tests/test-utils'
const mockedLoaderTestId = 'loader'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const refetchData = vi.fn()

const mockedSelect = {
  selected: [],
  createSelectAllHandler: vi.fn(),
  isSelected: vi.fn()
}

const mockedCommonProps = {
  select: mockedSelect,
  columns: [],
  filter: {},
  rowActions: []
}

const mockItem = {
  _id: '123456789',
  name: 'John Smith',
  email: 'john@email.com',
  lastLogin: '2023-02-28'
}

const mockOpenItem = {
  ...mockItem,
  status: 'Active'
}

const mockClosedItem = {
  ...mockItem,
  _id: '987654321',
  status: 'Closed'
}

describe('EnhancedTable component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render with loader', () => {
    render(
      <EnhancedTable
        data={{ loading: true, items: [] }}
        {...mockedCommonProps}
      />
    )
    const loader = screen.getByTestId(mockedLoaderTestId)

    expect(loader).toBeVisible()
  })

  it('render without loader and with noMatchesBox', () => {
    render(
      <EnhancedTable
        data={{ loading: false, items: [] }}
        {...mockedCommonProps}
      />
    )
    const loader = screen.queryByTestId(mockedLoaderTestId)
    const noMatchesBox = screen.getByTestId('no-matches-box')

    expect(loader).toBeNull()
    expect(noMatchesBox).toBeVisible()
  })

  it('render with tableBody ', () => {
    render(
      <EnhancedTable
        data={{ loading: false, items: [{ _id: 'mocked-id' }] }}
        {...mockedCommonProps}
      />
    )
    const tableContainer = screen.getByTestId('enhance-table-container')

    expect(tableContainer).toBeVisible()
  })

  describe('with dynamic rowActions', () => {
    const mockActions = [
      { label: 'Edit', func: vi.fn() },
      { label: 'View Details', func: vi.fn() }
    ]

    const getRowActions = (item) => {
      const isClosed = item.status === 'Closed'
      return mockActions.filter((action) =>
        isClosed ? action.label === 'View Details' : true
      )
    }

    const renderRowWithMenuIcon = async (item) => {
      renderWithProviders(
        <table>
          <tbody>
            <EnhancedTableRow
              columns={[]}
              isSelection
              item={item}
              refetchData={refetchData}
              rowActions={getRowActions(item)}
              select={mockedSelect}
            />
          </tbody>
        </table>
      )
      const menuIcon = screen.getByTestId('menu-icon')
      fireEvent.click(menuIcon)
    }

    it('should show all actions for open status item', async () => {
      renderRowWithMenuIcon(mockOpenItem)

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument()
        expect(screen.getByText('View Details')).toBeInTheDocument()
      })
    })

    it('should show only "View Details" action for closed status item', async () => {
      renderRowWithMenuIcon(mockClosedItem)

      await waitFor(() => {
        expect(screen.queryByText('Edit')).not.toBeInTheDocument()
        expect(screen.getByText('View Details')).toBeInTheDocument()
      })
    })
  })
})
