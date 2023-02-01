import { render, screen, fireEvent, within } from '@testing-library/react'
import Autocoplete from '~/components/autocoplete/Autocomplete'

const value = null
const optionsMock = [{ name: 'Languages' }, { name: 'Mathematics' }]

describe('Autocoplete test', () => {
  it('should show list of items', async () => {
    render(<Autocoplete options={ optionsMock } value={ value } />)

    const autocomplete = screen.getByTestId('autocomplete-search')
    const input = within(autocomplete).getByRole('combobox')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'mat' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(input.value).toBe('Mathematics')
  })
})
