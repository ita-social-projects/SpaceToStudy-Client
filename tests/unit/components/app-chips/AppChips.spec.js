import { render, screen, fireEvent } from '@testing-library/react'
import AppChip from '~/components/app-chips/AppChips'

const handleStepData = jest.fn()

const items = [
  { category: 'Languages', name: 'Chinese' },
  { category: 'Languages', name: 'Czech' },
  { category: 'Languages', name: 'Danish' },
  { category: 'Languages', name: 'Dutch' },
  { category: 'Languages', name: 'English' },
  { category: 'Languages', name: 'Estonian' },
  { category: 'Languages', name: 'Finnish' },
  { category: 'Languages', name: 'French' },
  { category: 'Languages', name: 'German' },
  { category: 'Languages', name: 'Ukrainian' }
]

describe('AppChip test', () => {
  it('should show chips', () => {
    render(<AppChip defaultQuantity={ 7 } items={ items } stepLabel='subject' />)
    const firstChip = screen.getByText(/Chinese/i)
    const secondChip = screen.getByText(/English/i)

    expect(firstChip).toBeInTheDocument()
    expect(secondChip).toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    render(<AppChip defaultQuantity={ 7 } items={ items } stepLabel='subject' />)
    const amountOfChips = screen.getByTestId('amount-of-chips')
    expect(amountOfChips).toBeInTheDocument()

    const number = screen.getByText(/\+3/i)
    expect(number).toBeInTheDocument()
  })

  it('should show only 7 chips', () => {
    render(<AppChip defaultQuantity={ 7 } items={ items } stepLabel='subject' />)
    const chip = screen.queryAllByTestId('chip')
    expect(chip.length).toBe(7)
  })

  it('should show only 10 chips', () => {
    render(<AppChip defaultQuantity={ 7 } items={ items } stepLabel='subject' />)
    const chips = screen.queryAllByTestId('chip')
    expect(chips.length).toBe(7)

    const amountOfChips = screen.getByTestId('amount-of-chips')

    fireEvent.click(amountOfChips)

    const newChips = screen.queryAllByTestId('chip')
    expect(newChips.length).toBe(10)
  })

  it('should delete one chip', () => {
    render(<AppChip defaultQuantity={ 7 } handleData={ handleStepData } items={ items } />)
    const closeBtn = screen.queryAllByTestId('close-btn')

    const firstChip = screen.queryAllByTestId('chip')[0]

    expect(firstChip).toBeDefined()

    fireEvent.click(closeBtn[0])

    const newChips = screen.queryAllByTestId('chip')
    expect(newChips.length).toBe(7)
  })
})
