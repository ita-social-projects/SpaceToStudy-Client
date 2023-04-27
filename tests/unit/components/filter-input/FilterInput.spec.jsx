import { render, fireEvent } from '@testing-library/react'
import FilterInput from '~/components/filter-input/FilterInput'

describe('FilterInput', () => {
  it('renders the input field', () => {
    const { getByRole } = render(<FilterInput />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('calls the onChange function when text is entered', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(<FilterInput onChange={handleChange} />)
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledWith('test')
  })

  it('clears the input when the clear button is clicked', () => {
    const handleChange = vi.fn()
    const { getByTestId } = render(
      <FilterInput onChange={handleChange} value='test' />
    )
    const clearButton = getByTestId('clear-button')
    fireEvent.click(clearButton)
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
