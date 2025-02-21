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
    const { getByRole } = render(<FilterInput onChange={handleChange} />)

    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    const [firstArgument] = handleChange.mock.lastCall

    expect(firstArgument.target.value).toBe('test')
  })

  it('clears the input when the clear button is clicked', () => {
    const handleChange = vi.fn()
    const { getByTestId } = render(
      <FilterInput onChange={handleChange} value='test' />
    )
    const clearButton = getByTestId('clear-button')
    fireEvent.click(clearButton)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith({ target: { value: '' } })
  })
})
