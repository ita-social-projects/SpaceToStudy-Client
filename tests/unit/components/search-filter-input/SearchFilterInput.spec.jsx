import { vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

const updateFilterMock = vi.fn()
const label = 'Search by name'
const textValue = 'test'

describe('SearchFilterInput component', () => {
  beforeEach(() => {
    render(
      <SearchFilterInput
        textFieldProps={{ label }}
        updateFilter={updateFilterMock}
      />
    )
  })

  it('should render component with input in it', () => {
    const input = screen.getByLabelText(label)

    expect(input).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    const input = screen.getByLabelText(label)

    fireEvent.change(input, { target: { value: textValue } })

    expect(input).toHaveTextContent(textValue)
  })

  it('should delete typed text when delete button is clicked', () => {
    const input = screen.getByLabelText(label)
    fireEvent.change(input, { target: { value: textValue } })

    const clearIcon = screen.getByTestId('clearIcon')
    fireEvent.click(clearIcon)

    expect(input).toHaveTextContent('')
    expect(updateFilterMock).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', () => {
    const input = screen.getByLabelText(label)
    fireEvent.change(input, { target: { value: textValue } })

    const searchButton = screen.getByRole('button', { name: 'common.search' })
    fireEvent.click(searchButton)

    expect(updateFilterMock).toHaveBeenCalledWith(textValue)
  })

  it('should call updateFilter function when enter is pressed', () => {
    const input = screen.getByLabelText(label)
    fireEvent.change(input, { target: { value: textValue } })

    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(updateFilterMock).toHaveBeenCalledWith(textValue)
  })
})
