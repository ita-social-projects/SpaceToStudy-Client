import { vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import userEvent from '@testing-library/user-event'

describe('SearchAutocomplete', () => {
  const options = ['Finland', 'France', 'Georgia', 'Germany']

  it('renders autocomplete with search input', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders autocomplete with search input value', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search='France'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    expect(searchInput.value).toBe('France')
  })

  it('updates search input on typing', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    userEvent.type(searchInput, 'Finland')
    expect(searchInput.value).toBe('Finland')
  })

  it('filters options on typing', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    userEvent.type(searchInput, 'F')
    const filteredOptions = screen.queryByText('Germany')
    expect(filteredOptions).toBeNull()
  })

  it('selects an option on click', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    fireEvent.mouseDown(searchInput)
    const option = screen.getByText('France')
    fireEvent.click(option)
    expect(searchInput.value).toBe('France')
  })

  it('clears search input on clear icon click', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search='France'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchInput = screen.getByLabelText('Search')
    const clearIcon = screen.getByTestId('ClearIcon')
    fireEvent.click(clearIcon)
    expect(searchInput.value).toBe('')
  })

  it('triggers search on search button click', () => {
    const setSearch = vi.fn()
    render(
      <SearchAutocomplete
        options={options}
        search='France'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const searchBtn = screen.getByRole('button', { name: 'common.search' })
    fireEvent.click(searchBtn)
    expect(setSearch).toHaveBeenCalledWith('France')
  })
})
