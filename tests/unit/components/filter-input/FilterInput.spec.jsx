import { afterEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import FilterInput from '~/components/filter-input/FilterInput'

describe('FilterInput', () => {
  const handleChange = vi.fn()

  afterEach(() => {
    handleChange.mockClear()
  })

  it('renders the input field', () => {
    const { getByRole } = render(<FilterInput onChange={() => {}} value='' />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('calls the onChange function when text is entered', () => {
    const { getByRole } = render(
      <FilterInput onChange={handleChange} value='' />
    )

    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    // Проверяем, что handleChange был вызван с строкой 'test', а не с объектом
    const firstArgument = handleChange.mock.calls[0][0]
    expect(firstArgument).toBe('test') // Ожидаем строку, а не объект события
  })

  it('clears the input when the clear button is clicked', () => {
    const { getByTestId } = render(
      <FilterInput onChange={handleChange} value='test' />
    )
    const clearButton = getByTestId('clear-button')
    fireEvent.click(clearButton)

    // Ожидаем, что handleChange был вызван с пустой строкой, а не объектом
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('') // Ожидаем, что будет передана пустая строка
  })
})
