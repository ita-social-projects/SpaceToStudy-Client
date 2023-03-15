import { render, fireEvent, screen } from '@testing-library/react'
import PriceFilter from '~/components/price-filter/PriceFilter'

const onChangeMock = vi.fn()

const minPrice = 0
const maxPrice = 1000

const delay = 500

describe('PriceFilter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    render(<PriceFilter max={ maxPrice } min={ minPrice } onChange={ onChangeMock } />)
  })
    
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    const minNumber = screen.getByText(minPrice.toString())
    expect(minNumber).toBeInTheDocument()
  })
  it('should call onChange when slider is moved', () => {   
    const [leftSlider] = screen.getAllByRole('slider')
    const inputValue = 25

    fireEvent.change(leftSlider, { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)

    expect(onChangeMock).toHaveBeenCalledWith([inputValue, maxPrice])
  })
  test('should call onChange when input is changed', async () => {
    const [leftInput] = screen.getAllByRole('textbox')
    const inputValue = 10
  
    fireEvent.change(leftInput, { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)
  
    expect(onChangeMock).toHaveBeenCalledWith([inputValue, maxPrice])
  })
  test('should not call onChange when input is changed wit not a number', async () => {
    const [minInput] = screen.getAllByRole('textbox')
    const inputValue = 'test'
  
    fireEvent.change(minInput, { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)
  
    expect(onChangeMock).not.toHaveBeenCalledWith()
  })
  test('should call onChange whith min number if input is empty', async () => {
    const inputs = screen.getAllByRole('textbox')
    const inputValue = ''

    fireEvent.change(inputs[1], { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)
  
    expect(onChangeMock).toHaveBeenCalledWith([minPrice, minPrice])
  })
  it('should update prices when input is blurred and input is greater than max value', () => {
    const [minInput] = screen.getAllByRole('textbox')
    const inputValue = 2000
  
    fireEvent.change(minInput, { target: { value: inputValue } })
    fireEvent.blur(minInput)

    expect(minInput).toHaveValue(maxPrice.toString())
  })
  it('should not update prices when input is blurred and value in input has not changed', () => {
    const [minInput] = screen.getAllByRole('textbox')
    const inputValue = minPrice.toString()
  
    fireEvent.change(minInput, { target: { value: inputValue } })
    fireEvent.blur(minInput)

    expect(minInput).toHaveValue(inputValue)
  })
})
