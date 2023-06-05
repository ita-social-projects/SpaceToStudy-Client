import { render, fireEvent, screen } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const onChangeMock = vi.fn()

const defaultValue = 555
const minPrice = 0
const maxPrice = 1000

const delay = 500

describe('SliderWithInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    render(
      <SliderWithInput
        defaultValue={defaultValue}
        max={maxPrice}
        min={minPrice}
        onChange={onChangeMock}
        title={'Price'}
      />
    )
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    const minNumber = screen.getByText(minPrice.toString())
    expect(minNumber).toBeInTheDocument()
  })
  it('should call onChange when slider is moved', () => {
    const [slider] = screen.getAllByRole('slider')
    const inputValue = 25

    fireEvent.change(slider, { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)

    expect(onChangeMock).toHaveBeenCalledWith(inputValue)
  })
  it('should update inputValue correctly when input value is empty', () => {
    const [minInput] = screen.getAllByRole('textbox')
    const inputValue = ''

    fireEvent.change(minInput, { target: { value: inputValue } })

    expect(minInput).toHaveValue(inputValue)
    expect(screen.getByRole('textbox').value).toBe('')
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
