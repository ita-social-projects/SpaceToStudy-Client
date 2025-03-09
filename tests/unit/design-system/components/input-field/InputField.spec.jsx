import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import InputField from '~/design-system/components/input-field/InputField'

const placeholderText = 'Placeholder'
const helperText = 'Helper text'

describe('InputField ', () => {
  it('should call onChange when input value changes', () => {
    const TestComponent = () => {
      const [value, setValue] = useState('')
      const handleChange = (e) => setValue(e.target.value)
      return (
        <InputField
          onChange={handleChange}
          placeholder={placeholderText}
          value={value}
        />
      )
    }

    render(<TestComponent />)

    const input = screen.getByPlaceholderText(placeholderText)
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(input.value).toBe('new value')
  })

  it('should render error state when error prop is true', () => {
    render(
      <InputField
        error
        helperText='Error message'
        onChange={() => {}}
        placeholder={placeholderText}
        value=''
      />
    )
    const errorText = screen.getByText('Error message')
    expect(errorText).toHaveClass('s2s-helper-text-error')
  })

  it('should render helper text', () => {
    render(
      <InputField
        helperText={helperText}
        onChange={() => {}}
        placeholder={placeholderText}
        value=''
      />
    )
    const helperTextElement = screen.getByText(helperText)
    expect(helperTextElement).toBeInTheDocument()
  })
})
