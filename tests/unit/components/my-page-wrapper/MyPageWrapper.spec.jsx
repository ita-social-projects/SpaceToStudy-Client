import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import MyPageWrapper from '~/components/my-page-wrapper/MyPageWrapper'

const loadingMock = false
const filterOptionsMock = {
  filters: {
    search: '',
    status: ''
  },
  setFilterByKey: () => vi.fn(),
  clearFilters: () => vi.fn()
}
const sortFieldsMock = [{ title: 'test', value: 'name asc' }]
const resetSortMock = vi.fn()
const sortOptionsMock = {
  sort: { orderBy: 'name', order: 'asc' },
  onRequestSort: () => vi.fn(),
  resetSort: resetSortMock
}
const titleMock = 'Test'
const buttonMock = { label: 'Label', buttonProps: {} }
const itemsViewMock = ''
const setItemsViewMock = vi.fn()

describe('MyPageWrapper', () => {
  beforeEach(() => {
    render(
      <MyPageWrapper
        button={buttonMock}
        filterOptions={filterOptionsMock}
        itemsView={itemsViewMock}
        loading={loadingMock}
        setItemsView={setItemsViewMock}
        sortFields={sortFieldsMock}
        sortOptions={sortOptionsMock}
        title={titleMock}
      />
    )
  })
  it('should render title and button correctly', () => {
    const title = screen.getByText(titleMock)
    const button = screen.getByRole('button', {
      name: buttonMock.label
    })

    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render tabs', () => {
    const tab = screen.getByText('cooperationsPage.tabs.pending')

    fireEvent.click(tab)

    expect(tab).toBeInTheDocument()
    expect(resetSortMock).toHaveBeenCalled()
  })

  it('should change content view on button click', () => {
    const viewButton = screen.getByLabelText('grid card view')
    fireEvent.click(viewButton)

    expect(setItemsViewMock).toHaveBeenCalled()
  })
})
