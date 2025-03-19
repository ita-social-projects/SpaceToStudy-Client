import { fireEvent, screen } from '@testing-library/react'

import ResourcesToolBarDrawer from '~/containers/my-resources/resources-toolbar-drawer/ResourcesToolbarDrawer'
import { renderWithProviders } from '~tests/test-utils'
import { SortEnum } from '~/types'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

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

describe('ResourcesToolBarDrawer test', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.getNames)
      .reply(200, mockCategories)

    renderWithProviders(<ResourcesToolBarDrawer {...props} />)
  })

  it('should render filter toggle', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    expect(filterToggle).toBeInTheDocument()
  })

  it('should click on filter toggle an render search input', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    fireEvent.click(filterToggle)

    const searchInput = screen.getByPlaceholderText('common.search')

    expect(searchInput).toBeInTheDocument()
  })

  it('should change and clear search input value', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    fireEvent.click(filterToggle)

    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: testValue } })

    expect(searchInput.value).toBe(testValue)

    const button = screen.getByTestId('clearIcon')

    fireEvent.click(button)

    expect(searchInput.value).not.toBe(testValue)
  })

  it('should change sort option', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    fireEvent.click(filterToggle)

    const select = screen.getByTestId('app-select')

    expect(select.value).toBe(selectValue.default)

    fireEvent.click(select)
    fireEvent.select(select, {
      target: { value: selectValue.updated }
    })

    expect(select.value).toBe(selectValue.updated)
  })

  it('should clear all filters', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    fireEvent.click(filterToggle)

    const button = screen.getByText('button.clearFilters')

    fireEvent.click(button)

    expect(setSearch).toHaveBeenCalled()
  })

  it('should apply all filters', () => {
    const filterToggle = screen.getByTestId('toggle-button')

    fireEvent.click(filterToggle)

    const button = screen.getByText('button.applyFilters')

    fireEvent.click(button)

    expect(setSearch).toHaveBeenCalled()
  })
})
