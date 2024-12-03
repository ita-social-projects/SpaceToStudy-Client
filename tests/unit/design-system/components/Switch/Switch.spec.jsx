import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { AppSwitch } from '~/design-system/components/switch/Switch'

describe('AppSwitch Component', () => {
  it('renders correctly with default props', () => {
    render(<AppSwitch />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeInTheDocument()
    expect(switchEl).not.toBeDisabled()
  })

  it('calls `onChange` when toggled', () => {
    const handleChange = vi.fn()
    render(<AppSwitch onChange={handleChange} />)

    const switchEl = screen.getByRole('checkbox')
    fireEvent.click(switchEl)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders label when provided', () => {
    render(<AppSwitch label="Test Label" />)

    const labelEl = screen.getByText('Test Label')
    expect(labelEl).toBeInTheDocument()
  })

  describe('Size classes', () => {
    it.each([
      ['lg', 's2s-switch--lg'],
      ['md', 's2s-switch--md'],
      ['sm', 's2s-switch--sm'],
    ])('applies the correct class for size: %s', (size, expectedClass) => {
      render(<AppSwitch size={size} />)
      const switchWrapper = screen.getByRole('checkbox').closest('.s2s-switch--lg, .s2s-switch--md, .s2s-switch--sm')
      
      expect(switchWrapper).toHaveClass(expectedClass)
    })
  })  

  it('is disabled when loading is true', () => {
    render(<AppSwitch loading />)
    const loaderEl = screen.getByTestId('loader')

    expect(loaderEl).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<AppSwitch disabled />)
    const switchEl = screen.getByRole('checkbox')

    expect(switchEl).toBeDisabled()
  })

  describe('Label position', () => {
    it.each([
      ['end', 'End Label'],
      ['start', 'Start Label'],
      ['top', 'Top Label'],
      ['bottom', 'Bottom Label'],
    ])(
      'renders label in correct position: %s',
      (position, label) => {
        render(<AppSwitch label={label} labelPosition={position} />)
        const labelEl = screen.getByText(label)

        expect(labelEl).toBeInTheDocument()
      }
    )
  })
})
