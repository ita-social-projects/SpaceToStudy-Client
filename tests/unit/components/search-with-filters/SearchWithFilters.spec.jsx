import { vi } from 'vitest'
import { screen, render, fireEvent, within } from '@testing-library/react'
import SearchWithFilters from '~/components/search-with-filters/SearchWithFilters'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

const options = ['Option 1', 'Option 2', 'Option 3']
const setSearch = vi.fn()
const category = null
const onCategoryChange = vi.fn()
const categoryItems = ['Language', 'Music']
const filters = (
  <AppAutoComplete
    onChange={ onCategoryChange }
    options={ categoryItems }
    textFieldProps={ {
      label: 'breadCrumbs.categories'
    } }
    value={ category }
  />
)

describe('SearchWithFilters', () => {
  beforeEach(() => {
    render(<SearchWithFilters
      filters={ filters } options={ options } search=''
      setSearch={ setSearch }
           />)
  })

  it('renders the search input and filters', () => {
    const autocomplete = screen.getByTestId('searchWithFilters')

    expect(autocomplete).toBeInTheDocument()

    const categoryAutocomplete = screen.queryAllByText('breadCrumbs.categories')
    const categoryLabel = categoryAutocomplete.find((el) => el.tagName === 'LABEL')

    expect(categoryLabel).toBeInTheDocument()
  })

  it('updates the search value when input changes', () => {
    const autocomplete = screen.getByTestId('searchWithFilters')
    const searchInput = within(autocomplete).getByRole('combobox')

    fireEvent.change(searchInput, { target: { value: 'Option' } })
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' })
    fireEvent.keyDown(searchInput, { key: 'Enter' })

    expect(searchInput.value).toBe('Option 1')
  })

  it('calls the onSearch function when search button is clicked', () => {
    const searchButton = screen.getByText('common.search')
    fireEvent.click(searchButton)

    expect(setSearch).toHaveBeenCalled()
  })
})
