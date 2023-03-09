import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

const searchMock = ''
const setSearchMock = vi.fn()

describe('SearchInput tests', () => {

  it('should render text correctly', () => {
    render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
    const input = screen.getByTestId('form').querySelector('input')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input.value).toBe('test')
  })

  it('should call setSearch when search icon is clicked', () => {
    render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
    const input = screen.getByTestId('form').querySelector('input')
    const searchIcon = screen.getByTestId('search-icon')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(searchIcon)

    expect(setSearchMock).toHaveBeenCalledWith('test')
  })

  it('should call setState with empty string when delete icon is clicked', () => {
    render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
    const deleteIcon = screen.getByTestId('delete-icon')

    fireEvent.click(deleteIcon)

    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', () => {
    render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
    const input = screen.getByTestId('form').querySelector('input')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(setSearchMock).toHaveBeenCalledWith('test')
  })

  it('should dynamically change visibility of delete button', () => {
    const { rerender } = render(<SearchInput search={ searchMock } setSearch={ setSearchMock } />)
    const input = screen.getByTestId('form').querySelector('input')
    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toHaveClass('hidden')

    fireEvent.change(input, { target: { value: 'test' } })
    rerender(<SearchInput search="test" setSearch={ setSearchMock } />)

    expect(deleteIcon).toHaveClass('visible')
  })
})
