import { fireEvent, render, screen } from '@testing-library/react'
import CheckBox from '~scss-components/checkbox/CheckBox'
import { expect } from 'vitest'

describe('CheckBox Component', () => {
  test('renders checkbox with label', () => {
    render(<CheckBox label='test label' />)
    expect(screen.getByText('test label')).toBeInTheDocument()
  })

  test('toggles on click', () => {
    render(<CheckBox label='test label' />)
    const checkbox = document.querySelector('.PrivateSwitchBase-input')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('renders Loader and disables checkbox in loding state', () => {
    render(<CheckBox label='test label' loading />)
    expect(screen.getByTestId('checkbox-loader')).toBeInTheDocument()
  })

  test('sets indeterminate state when variant is middle', () => {
    render(<CheckBox label='test label' variant='middle' />)
    const checkbox = document.querySelector('.PrivateSwitchBase-input')
    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true')
  })

  test('is disabled when disabled', () => {
    render(<CheckBox label='test label' disabled />)
    const checkbox = screen.getByTestId('checkbox-input')
    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
  })

  test('applies correct size class', () => {
    render(<CheckBox label='test label' size='lg' />)
    const label = screen.getByText('test label').closest('label')
    expect(label).toHaveClass('s2s-checkbox--lg')
  })

  test('starts unchecked', () => {
    render(<CheckBox label='test label' variant='check' />)
    const checkbox = document.querySelector('.PrivateSwitchBase-input')
    expect(checkbox).not.toBeChecked()
  })

  test('applies correct color when success', () => {
    render(<CheckBox label='test label' variant='check' color='success' />)
    const label = screen.getByTestId('checkbox-label')
    expect(label).toHaveClass('s2s-checkbox--success')
  })

  test('applies correct color when error', () => {
    render(<CheckBox label='test label' variant='check' color='error' />)
    const label = screen.getByTestId('checkbox-label')
    expect(label).toHaveClass('s2s-checkbox--error')
  })

  test('renders loader with correct size', () => {
    render(<CheckBox label='test label' variant='check' size='sm' loading />)
    const loader = screen.getByRole('progressbar')
    expect(loader).toHaveStyle('width: 14px; height: 14px')
  })
})
