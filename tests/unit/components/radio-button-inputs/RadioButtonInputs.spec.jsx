import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import RadioButtonInputs from '~/components/radio-button-inputs/RadioButtonInputs'

const mockedProps = {
  items: [
    { title: 'First Radio Title', value: 0 },
    { title: 'Second Radio Title', value: 1 },
    { title: 'Third Radio Title', value: 2 },
    { title: 'Fourth Radio Title', value: 3 }
  ],
  onChange: vi.fn(),
  title: 'Rating'
}

describe('RadioButtonInputs test', () => {
  beforeEach(() => {
    render(<RadioButtonInputs {...mockedProps} />)
  })

  it('Should render radio buttons title correctly', () => {
    const radioButtonTitle = screen.getByLabelText('First Radio Title')

    expect(radioButtonTitle).toBeInTheDocument()
  })

  it('Should call onChange function with the selected value', () => {
    const radioButton = screen.getByLabelText('Third Radio Title')

    fireEvent.click(radioButton)

    expect(mockedProps.onChange).toHaveBeenCalled(1)
    expect(mockedProps.onChange).toHaveBeenCalledWith('2')
  })

  it('Should render title if it provided', () => {
    const titleElement = screen.getByText('Rating')

    expect(titleElement).toBeInTheDocument()
  })
})
