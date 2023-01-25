import { render, screen, fireEvent, within, act } from '@testing-library/react'
import Autocoplete from '~/components/autocoplete/Autocomplete'

const setData = jest.fn()
const value = null
const optionsMock = [{ name: 'Languages' }, { name: 'Mathematics' }]

describe('Autocoplete test', () => {
  it('should show list of items', async () => {
    render(<Autocoplete options={ optionsMock } setData={ setData } value={ value } />)

    const autocomplete = screen.getByTestId('autocomplete-search')
    const input = within(autocomplete).getByRole('combobox')

    act(() => {
      fireEvent.click(input)
    })
    act(() => {
      fireEvent.change(input, { target: { value: 'mat' } })
    })
    act(() => {
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    })
    act(() => {
      fireEvent.keyDown(autocomplete, { key: 'Enter' })
    })

    expect(input.value).toBe('Mathematics')
  })
})
