import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import EnhancedTableToolbar from '~/components/enhanced-table/enhanced-table-toolbar/EnhancedTableToolbar'

vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))
const refetchData = vi.fn()
const bulkActions = [
  {
    title: 'Bulk action 1',
    func: vi.fn(),
    icon: <span>Bulk action 1 icon</span>
  },
  {
    title: 'Bulk action 2',
    func: vi.fn(),
    icon: <span>Bulk action 2 icon</span>
  }
]
const selected = ['63edddaccd1767170312c8fc', '63ff48ca11df3fb83ce11305']

describe('EnhancedTableToolbar test', () => {
  it('should render the correct number of selected items', () => {
    render(
      <EnhancedTableToolbar
        bulkActions={bulkActions}
        itemIds={selected}
        refetchData={refetchData}
      />
    )

    const amountOfSelected = screen.getByTestId('amountOfSelected')
    const result = `${selected.length} table.selected`

    expect(amountOfSelected).toHaveTextContent(result)
  })

  it('should call the action function and refetch data when a bulk action is clicked', () => {
    const { func } = bulkActions[0]
    const tooltipTitle = bulkActions[0].title

    render(
      <EnhancedTableToolbar
        bulkActions={bulkActions}
        itemIds={selected}
        refetchData={refetchData}
      />
    )
    const button = screen.getByLabelText(tooltipTitle)

    fireEvent.click(button)

    expect(func).toHaveBeenCalledWith({ itemIds: selected })
  })
})
