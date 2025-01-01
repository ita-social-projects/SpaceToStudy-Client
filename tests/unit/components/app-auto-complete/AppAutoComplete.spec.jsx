import { fireEvent, screen, waitFor } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const value = null
const labelCountry = 'common.labels.country'
const optionsCountry = ['Finland', 'France', 'Georgia', 'Germany']
const labelCity = 'common.labels.city'
const optionsCity = ['Verhovyna', 'Frankivsk', 'Kyiv', 'Lviv', 'Odesa']
const onChange = vi.fn()
const styles = {}

describe('AppAutoComplete test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={optionsCountry}
        sx={styles}
        textFieldProps={{
          label: labelCountry
        }}
        type='text'
        value={value}
      />
    )
  })

  it('Should render Autocomplete and choose option', () => {
    const autocomplete = screen.getByLabelText(/common.labels.country/i)

    fireEvent.mouseDown(autocomplete)

    const option = screen.getByText('France')

    fireEvent.click(option)

    expect(onChange).toHaveBeenCalled()
  })
})
describe('AppAutoComplete test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={optionsCity.sort()}
        sx={styles}
        textFieldProps={{
          label: labelCity
        }}
        type='text'
        value={value}
      />
    )
  })
  it('Should render Autocomplete and open dropdown when clicking on City field', async () => {
    const autocomplete = screen.getByLabelText(/common.labels.city/i)
    fireEvent.mouseDown(autocomplete)

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    const option = screen.getByText('Verhovyna')
    fireEvent.click(option)

    expect(onChange).toHaveBeenCalled()
  })
  it('Should display dropdown list in alphabetic order and show text cursor when clicking on City field', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)

    await waitFor(() => {
      expect(cityField).toHaveFocus()
    })
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    const optionsInDropdown = screen.getAllByRole('option')
    
    const cityNames = optionsInDropdown.map(option => option.textContent?.trim())
    const sortedCityNames = [...cityNames].sort()
    expect(cityNames).toEqual(sortedCityNames)
  })
  it('Should show filtered results based on user input', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)

    fireEvent.change(cityField, { target: { value: 'Verhovy' } })

    await waitFor(() => {
      const optionsInDropdown = screen.getAllByRole('option')
      expect(optionsInDropdown[0]).toHaveTextContent('Verhovyna')
    })
  })
  it('Should clear the City field when Backspace key is pressed', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)
    
    fireEvent.change(cityField, { target: { value: 'Verhovyna' } })
    fireEvent.change(cityField, { target: { value: '' } })

    await waitFor(() => {
      expect(cityField).toHaveValue('')
      expect(cityField).toHaveFocus()
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    const optionsInDropdown = screen.getAllByRole('option')
    const cityNames = optionsInDropdown.map(option => option.textContent?.trim())
    const sortedCityNames = [...cityNames].sort()
    expect(cityNames).toEqual(sortedCityNames)
  })
  it('Should show filtered results based on text input in City field', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.click(cityField)

    fireEvent.change(cityField, { target: { value: 'Frankivsk' } })

    await waitFor(() => {
      const optionsInDropdown = screen.getAllByRole('option')
      expect(optionsInDropdown[0]).toHaveTextContent('Frankivsk')
      expect(optionsInDropdown[0]).not.toHaveTextContent('Verhovyna')
    })
  })
})