import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import {AppSwitch} from '~/design-system/components/switch/Switch'

describe('AppSwitch Component', () => {
  it('renders correctly with default props', () => {
    render(<AppSwitch />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeInTheDocument()
  })

  it('triggers `onChange` when toggled', () => {
    const handleChange = vi.fn()
    render(<AppSwitch onChange={handleChange} />)

    const switchEl = screen.getByRole('checkbox')
    fireEvent.click(switchEl)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('displays the label when provided', () => {
    render(<AppSwitch label='Test Label' />)

    const labelEl = screen.getByText('Test Label')
    expect(labelEl).toBeInTheDocument()
  })

  it('applies the correct Large size style', () => {
    render(<AppSwitch size='lg' />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeInTheDocument()
  })

  it('applies the correct Medium size style', () => {
    render(<AppSwitch size='md' />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeInTheDocument()
  })

  it('applies the correct Small size style', () => {
    render(<AppSwitch size='sm' />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeInTheDocument()
  })

  it('is disabled when loading is true', () => {
    render(<AppSwitch loading />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<AppSwitch disabled />)

    const switchEl = screen.getByRole('checkbox')
    expect(switchEl).toBeDisabled()
  })

  it('renders the label in the correct end position', () => {
    render(<AppSwitch label="End Label" labelPosition='end' />)

    const labelEl = screen.getByText('End Label')
    expect(labelEl).toBeInTheDocument()
  })

  it('renders the label in the correct start position', () => {
    render(<AppSwitch label="Start Label" labelPosition='start' />)

    const labelEl = screen.getByText('Start Label')
    expect(labelEl).toBeInTheDocument()
  })

  it('renders the label in the correct top position', () => {
    render(<AppSwitch label="Top Label" labelPosition='top' />)

    const labelEl = screen.getByText('Top Label')
    expect(labelEl).toBeInTheDocument()
  })

  it('renders the label in the correct bottom position', () => {
    render(<AppSwitch label="Bottom Label" labelPosition='bottom' />)

    const labelEl = screen.getByText('Bottom Label')
    expect(labelEl).toBeInTheDocument()
  })

})