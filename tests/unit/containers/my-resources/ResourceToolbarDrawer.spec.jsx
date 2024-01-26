import { fireEvent, screen, waitFor } from '@testing-library/react'

import { ResourceService } from '~/services/resource-service'
import ResourcesToolBarDrawer from '~/containers/my-resources/resources-toolbar-drawer/ResourcesToolbarDrawer'
import { renderWithProviders } from '~tests/test-utils'
import { SortEnum } from '~/types'

const setCategories = vi.fn()
const setSearch = vi.fn()
const testValue = 'hello'
const selectValue = { default: 'updatedAt desc', updated: 'updatedAt asc' }
const mockCategories = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

const props = {
  setCategories,
  setSearch,
  sortOptions: {
    onRequestSort: vi.fn(),
    resetSort: vi.fn(),
    sort: { order: SortEnum.Desc, orderBy: 'updatedAt' }
  },
  isMobile: false
}

vi.mock('~/services/resource-service')

ResourceService.getResourcesCategoriesNames.mockResolvedValue({
  data: mockCategories
})

describe('ResourcesToolBarDrawer test', () => {
  beforeEach(() => {
    renderWithProviders(<ResourcesToolBarDrawer {...props} />)
  })

  it('should render filter toggle', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    expect(filterToggle).toBeInTheDocument()
  })

  it('should click on filter toggle an render search input', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    waitFor(() => fireEvent.click(filterToggle))

    const searchInput = screen.getByPlaceholderText('common.search')

    expect(searchInput).toBeInTheDocument()
  })

  it('should change and clear search input value', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    waitFor(() => fireEvent.click(filterToggle))

    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: testValue } })

    expect(searchInput.value).toBe(testValue)

    const button = screen.getByTestId('clearIcon')

    waitFor(() => fireEvent.click(button))

    expect(searchInput.value).not.toBe(testValue)
  })

  it('should change sort option', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    waitFor(() => fireEvent.click(filterToggle))

    const select = screen.getByTestId('app-select')

    expect(select.value).toBe(selectValue.default)

    fireEvent.click(select)
    fireEvent.change(select, {
      target: { value: selectValue.updated }
    })

    expect(select.value).toBe(selectValue.updated)
  })

  it('should clear all filters', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    waitFor(() => fireEvent.click(filterToggle))

    const button = screen.getByText('button.clearFilters')

    waitFor(() => fireEvent.click(button))

    expect(setSearch).toHaveBeenCalled()
  })

  it('should apply all filters', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    waitFor(() => fireEvent.click(filterToggle))

    const button = screen.getByText('button.applyFilters')

    waitFor(() => fireEvent.click(button))

    expect(setSearch).toHaveBeenCalled()
  })
})
