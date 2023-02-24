import { render, screen, fireEvent } from '@testing-library/react'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { vi } from 'vitest'

const handleChipDelete = vi.fn()

const items = [
  'Chinese',
  'Czech',
  'Danish',
  'English',
  'Estonian',
  'French',
  'Hungarian',
  'Italian',
  'Ukrainian',
  'Slovak'
]

describe('AppChip test', () => {
  it('should show chips', () => {
    render(<AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ items } />)
    const firstChip = screen.getByText(/Chinese/i)
    const secondChip = screen.getByText(/English/i)

    expect(firstChip).toBeInTheDocument()
    expect(secondChip).toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    render(<AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ items } />)
    const amountOfChips = screen.getByTestId('amount-of-chips')
    expect(amountOfChips).toBeInTheDocument()

    const number = screen.getByText(/\+3/i)
    expect(number).toBeInTheDocument()
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ items } />)
    const chip = screen.queryAllByTestId('chip')
    expect(chip.length).toBe(7)
  })

  it('should show only 10 chips', () => {
    render(<AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ items } />)
    const chips = screen.queryAllByTestId('chip')
    expect(chips.length).toBe(7)

    const amountOfChips = screen.getByTestId('amount-of-chips')

    fireEvent.click(amountOfChips)

    const newChips = screen.queryAllByTestId('chip')
    expect(newChips.length).toBe(17)
  })

  it('should delete one chip', () => {
    render(<AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ items } />)
    const closeBtn = screen.queryAllByTestId('close-btn')

    const firstChip = screen.queryAllByTestId('chip')[0]

    expect(firstChip).toBeDefined()

    fireEvent.click(closeBtn[0])

    const newChips = screen.queryAllByTestId('chip')
    expect(newChips.length).toBe(7)
  })
})
