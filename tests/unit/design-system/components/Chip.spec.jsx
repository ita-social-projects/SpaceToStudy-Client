import { fireEvent, render, screen } from '@testing-library/react'
import Chip from '~/design-system/components/chip/Chip'

describe('Chip', () => {
  it('checks the basic properties of chip', () => {
    render(<Chip type='input' size='sm' label='Chip' disabled />)

    const chip = screen.getByText('Chip').parentElement
    expect(chip).toHaveClass('s2s-chip--input')
    expect(chip).toHaveClass('s2s-chip--sm')
    expect(chip).toHaveClass('s2s-outlined')
    expect(chip).toHaveClass('s2s-disabled')
  })
})

describe('FilterChip', () => {
  it('renders the filter chip with a label', () => {
    render(
      <Chip
        type='filter'
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
      />
    )

    expect(screen.getByText('Filter Chip')).toBeInTheDocument()
  })

  it('opens the dropdown menu when clicked', async () => {
    render(
      <Chip
        type='filter'
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
      />
    )

    fireEvent.click(screen.getByText('Filter Chip'))

    const option1 = await screen.findByText('Option 1')
    const option2 = await screen.findByText('Option 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('selects an option when clicked and closes dropdown menu after', async () => {
    render(
      <Chip
        type='filter'
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
      />
    )

    fireEvent.click(screen.getByText('Filter Chip'))

    const option1 = await screen.findByText('Option 1')

    fireEvent.mouseDown(option1)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.queryByText('Filter Chip')).not.toBeInTheDocument()
  })
})

describe('InputChip', () => {
  it('renders the input chip with a label', () => {
    render(<Chip type='input' label='Input Chip' />)

    expect(screen.getByText('Input Chip')).toBeInTheDocument()
  })

  it('renders with the correct variant', () => {
    render(<Chip type='input' label='Input Chip' variant='outlined' />)

    const chip = screen.getByText('Input Chip').parentElement
    expect(chip).toHaveClass('s2s-outlined')
  })
})

describe('CategoryChip', () => {
  it('renders the category chip with a label and detail', () => {
    render(
      <Chip
        type='category'
        label='Category Chip'
        detail='Detail'
        color='blue'
      />
    )

    expect(screen.getByText('Category Chip')).toBeInTheDocument()
    expect(screen.getByText('Detail')).toBeInTheDocument()
  })

  it('applies the correct style based on the color prop', () => {
    render(
      <Chip
        type='category'
        label='Category Chip'
        detail='Detail'
        color='blue'
      />
    )

    const labelChip = screen.getByText('Category Chip').parentElement
    const detailChip = screen.getByText('Detail').parentElement

    expect(labelChip.style.getPropertyValue('--chip-bg-color')).toBe(
      'var(--s2s-blue-300)'
    )
    expect(detailChip.style.getPropertyValue('--chip-bg-color')).toBe(
      'var(--s2s-blue-100)'
    )
  })
})

describe('StateChip', () => {
  it('renders the state chip with a label', () => {
    render(<Chip type='state' label='State Chip' color='green' />)

    expect(screen.getByText('State Chip')).toBeInTheDocument()
  })

  it('applies the correct style based on the color prop', () => {
    render(<Chip type='state' label='State Chip' color='green' />)

    const chip = screen.getByText('State Chip').parentElement
    expect(chip.style.getPropertyValue('--chip-bg-color')).toBe(
      'var(--s2s-green-100)'
    )
    expect(chip.style.getPropertyValue('--chip-text-color')).toBe(
      'var(--s2s-green-700)'
    )
    expect(chip.style.getPropertyValue('--chip-border-color')).toBe(
      'var(--s2s-green-700)'
    )
  })
})
