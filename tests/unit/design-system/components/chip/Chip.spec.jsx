import { fireEvent, render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import Chip from '~/design-system/components/chip/Chip'

describe('Chip', () => {
  it('should render chip with correct classes', () => {
    render(<Chip disabled label='Chip' size='sm' type='input' />)

    const chip = screen.getByText('Chip').parentElement
    expect(chip).toHaveClass('s2s-chip--input')
    expect(chip).toHaveClass('s2s-chip--sm')
    expect(chip).toHaveClass('s2s-outlined')
    expect(chip).toHaveClass('s2s-disabled')
  })
})

describe('FilterChip', () => {
  it('should render the filter chip with a label', () => {
    render(
      <Chip
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    expect(screen.getByText('Filter Chip')).toBeInTheDocument()
  })

  it('should open the dropdown menu when clicked', async () => {
    render(
      <Chip
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    fireEvent.click(screen.getByText('Filter Chip'))

    const option1 = await screen.findByText('Option 1')
    const option2 = await screen.findByText('Option 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('should select an option when clicked and close dropdown menu after', async () => {
    render(
      <Chip
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    fireEvent.click(screen.getByText('Filter Chip'))

    const option1 = await screen.findByText('Option 1')

    fireEvent.click(option1)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.queryByText('Filter Chip')).not.toBeInTheDocument()
  })

  it('should be initial open with initialIsOpen=true', async () => {
    render(
      <Chip
        initialIsOpen
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    const option1 = await screen.findByText('Option 1')
    const option2 = await screen.findByText('Option 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('should have initial selected option', async () => {
    render(
      <Chip
        initialSelectedOption='Option 1'
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    const unselectedDropdownTrigger = screen.queryByText('Filter Chip')
    const selectedDropdownTrigger = screen.getByTestId('s2s-dropdown-trigger')

    expect(unselectedDropdownTrigger).not.toBeInTheDocument()
    expect(selectedDropdownTrigger).toHaveTextContent('Option 1')
  })

  it('should not be closed after selecting option if chip is controllable by isOpen state', async () => {
    render(
      <Chip
        isOpen
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )
    const option1 = await screen.findByText('Option 1')

    fireEvent.click(option1)

    const dropdownMenu = screen.getByTestId('s2s-dropdown-menu')

    expect(dropdownMenu).toBeInTheDocument()
  })

  it('should not be open after clicking on dropdown trigger if chip is controllable by isOpen state', async () => {
    render(
      <Chip
        isOpen={false}
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )
    const dropdownTrigger = screen.queryByText('Filter Chip')

    fireEvent.click(dropdownTrigger)

    const dropdownMenu = screen.queryByTestId('s2s-dropdown-menu')

    expect(dropdownMenu).not.toBeInTheDocument()
  })

  it('should not change selected option if chip is controllable by selectedOption state', async () => {
    render(
      <Chip
        label='Filter Chip'
        options={['Option 1', 'Option 2']}
        selectedOption='Option 1'
        type='filter'
      />
    )
    const dropdownTrigger = screen.getByTestId('s2s-dropdown-trigger')

    fireEvent.click(dropdownTrigger)

    const option2 = screen.getByText('Option 2')

    fireEvent.click(option2)

    expect(dropdownTrigger).toHaveTextContent('Option 1')
  })

  it('should call the onIsOpenChange after changing isOpen state', async () => {
    const onIsOpenChange = vi.fn()

    render(
      <Chip
        label='Filter Chip'
        onIsOpenChange={onIsOpenChange}
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    const dropdownTrigger = screen.getByTestId('s2s-dropdown-trigger')

    fireEvent.click(dropdownTrigger)

    expect(onIsOpenChange).toHaveBeenCalledOnce()
    expect(onIsOpenChange).toHaveBeenCalledWith(true)

    fireEvent.click(dropdownTrigger)

    expect(onIsOpenChange).toHaveBeenCalledTimes(2)
    expect(onIsOpenChange).toHaveBeenCalledWith(false)
  })

  it('should call the onSelectedOptionChange after changing selectedOption state', async () => {
    const onSelectedOptionChange = vi.fn()

    render(
      <Chip
        label='Filter Chip'
        onSelectedOptionChange={onSelectedOptionChange}
        options={['Option 1', 'Option 2']}
        type='filter'
      />
    )

    const dropdownTrigger = screen.getByTestId('s2s-dropdown-trigger')

    fireEvent.click(dropdownTrigger)

    const option2 = screen.getByText('Option 2')

    fireEvent.click(option2)

    expect(onSelectedOptionChange).toHaveBeenCalledOnce()
    expect(onSelectedOptionChange).toHaveBeenCalledWith('Option 2')
  })
})

describe('InputChip', () => {
  it('should render the input chip with a label', () => {
    render(<Chip label='Input Chip' type='input' />)

    expect(screen.getByText('Input Chip')).toBeInTheDocument()
  })

  it('should render with the correct variant', () => {
    render(<Chip label='Input Chip' type='input' variant='outlined' />)

    const chip = screen.getByText('Input Chip').parentElement
    expect(chip).toHaveClass('s2s-outlined')
  })

  it('should call onRemoveButtonClick after clicking on remove button', () => {
    const onRemoveButtonClick = vi.fn()

    render(
      <Chip
        label='Input Chip'
        onRemoveButtonClick={onRemoveButtonClick}
        type='input'
        variant='outlined'
      />
    )

    const removeButton = screen.getByTestId('s2s-input-chip-remove-btn')

    fireEvent.click(removeButton)

    expect(onRemoveButtonClick).toHaveBeenCalledOnce()
  })
})

describe('CategoryChip', () => {
  it('should render the category chip with a label and detail', () => {
    render(
      <Chip
        color='blue'
        detail='Detail'
        label='Category Chip'
        type='category'
      />
    )

    expect(screen.getByText('Category Chip')).toBeInTheDocument()
    expect(screen.getByText('Detail')).toBeInTheDocument()
  })

  it('should apply the correct style based on the color prop', () => {
    render(
      <Chip
        color='blue'
        detail='Detail'
        label='Category Chip'
        type='category'
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
  it('should render the state chip with a label', () => {
    render(<Chip color='green' label='State Chip' type='state' />)

    expect(screen.getByText('State Chip')).toBeInTheDocument()
  })

  it('should apply the correct style based on the color prop', () => {
    render(<Chip color='green' label='State Chip' type='state' />)

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
