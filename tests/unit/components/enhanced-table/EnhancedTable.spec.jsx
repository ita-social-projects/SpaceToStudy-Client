import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import EnhancedTable from '~/components/enhanced-table/EnhancedTable.tsx'

const mockedLoaderTestId = 'loader'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

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

describe('EnhancedTable component', () => {
  it('render with loader', () => {
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
})
