import { describe, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import userEvent from '@testing-library/user-event'

const options = ['Finland', 'France', 'Italy', 'Germany']
const setSearch = vi.fn()
const objOptions = [
  { name: 'Option1', displayName: 'Option 1' },
  { name: 'Option2', displayName: 'Option 2' }
]

describe('SearchAutocomplete', () => {
  beforeEach(() => {
    render(
      <SearchAutocomplete
        options={options}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )
  })

  it('renders autocomplete with search input', () => {
    const searchInput = screen.getByLabelText('Search')
    expect(searchInput).toBeInTheDocument()
  })

  it('updates search input on typing', async () => {
    const user = userEvent.setup()

    const searchInput = screen.getByLabelText('Search')

    await user.type(searchInput, 'Finland')

    expect(searchInput.value).toBe('Finland')
  })

  it('filters options on typing', async () => {
    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'F')
    const filteredOptions = screen.queryByText('Germany')
    expect(filteredOptions).toBeNull()
  })

  it('selects an option on click', () => {
    const searchInput = screen.getByLabelText('Search')
    fireEvent.mouseDown(searchInput)
    const option = screen.getByText('France')
    fireEvent.click(option)
    expect(searchInput.value).toBe('France')
  })
})

describe('SearchAutocomplete test', () => {
  beforeEach(() => {
    render(
      <SearchAutocomplete
        options={options}
        search='France'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )
  })

  it('clears search input on clear icon click', () => {
    const searchInput = screen.getByLabelText('Search')
    const clearIcon = screen.getByTestId('ClearIcon')
    fireEvent.click(clearIcon)
    expect(searchInput.value).toBe('')
  })

  it('triggers search on search button click', () => {
    const searchBtn = screen.getByRole('button', { name: 'common.search' })
    fireEvent.click(searchBtn)
    expect(setSearch).toHaveBeenCalledWith('France')
  })
})

describe('SearchAutocomplete', () => {
  it('should handle object options', () => {
    render(
      <SearchAutocomplete
        options={objOptions}
        search='Option1'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const input = screen.getByLabelText('Search')
    fireEvent.mouseDown(input)

    const option1 = screen.getByText('Option 1')
    const option2 = screen.getByText('Option 2')

    expect(option1).toHaveAttribute('aria-selected', 'true')
    expect(option2).toHaveAttribute('aria-selected', 'false')
  })

  it('should handle mixed options', () => {
    render(
      <SearchAutocomplete
        options={[...objOptions, 'Option3']}
        search='Option3'
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )

    const input = screen.getByLabelText('Search')
    fireEvent.mouseDown(input)

    const option3 = screen.getByText('Option3')
    const option1 = screen.getByText('Option 1')

    expect(option3).toHaveAttribute('aria-selected', 'true')
    expect(option1).toHaveAttribute('aria-selected', 'false')
  })
})
