import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

const searchMock = ''
const setSearchMock = vi.fn()
const textValue = 'test'

describe('SearchInput tests', () => {
  beforeEach(() => {
    render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
  })

  it('should render text correctly', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: textValue } })

    expect(input.value).toBe(textValue)
  })

  it('should call setSearch when search icon is clicked', () => {
    const input = screen.getByRole('textbox')
    const searchIcon = screen.getByTestId('search-icon')

    fireEvent.change(input, { target: { value: textValue } })
    fireEvent.click(searchIcon)

    expect(setSearchMock).toHaveBeenCalledWith(textValue)
  })

  it('should call setState with empty string when delete icon is clicked', () => {
    const deleteIcon = screen.getByTestId('delete-icon')

    fireEvent.click(deleteIcon)

    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: textValue } })
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(setSearchMock).toHaveBeenCalledWith(textValue)
  })

  it('should have hidden class if search is empty', () => {
    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toHaveClass('hidden')
  })
})

describe('SearchInput test', () => {
  beforeEach(() => {
    render(<SearchInput search={ textValue } setSearch={ setSearchMock } />)
  })
  
  it('should have visible class if search is not empty', () => {
    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toHaveClass('visible')
  })
})
