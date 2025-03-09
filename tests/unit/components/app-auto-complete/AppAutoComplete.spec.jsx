import { fireEvent, screen } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const value = null
const labelCountry = 'common.labels.country'
const optionsCountry = ['Ukraine', 'Finland', 'France', 'Georgia', 'Germany']
const labelCity = 'common.labels.city'
const optionsCity = ['Verhovyna', 'Frankivsk', 'Kyiv', 'Lviv', 'Odesa']
const onChange = vi.fn()
const styles = {}

describe('AppAutoComplete test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={optionsCountry.sort()}
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
  it('Should display dropdown list in alphabetic order and show text cursor when clicking on Country field', async () => {
    const countryField = screen.getByRole('combobox')
    fireEvent.mouseDown(countryField)
    fireEvent.focus(countryField)
    fireEvent.click(countryField)

    expect(countryField).toHaveFocus()

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const optionsInDropdown = screen.getAllByRole('option')
    const countryNames = optionsInDropdown.map((option) =>
      option.textContent?.trim()
    )
    const sortedCountryNames = [...countryNames].sort()
    expect(countryNames).toEqual(sortedCountryNames)
  })
  it('Should show filtered results based on user input', () => {
    const countryField = screen.getByRole('combobox')
    fireEvent.mouseDown(countryField)
    fireEvent.focus(countryField)
    fireEvent.click(countryField)

    fireEvent.change(countryField, { target: { value: 'Ukr' } })

    const optionsInDropdown = screen.getAllByRole('option')
    expect(optionsInDropdown[0]).toHaveTextContent('Ukraine')
  })
  it('Should show filtered results based on user input. Case insensitive', async () => {
    const countryField = screen.getByRole('combobox')
    fireEvent.mouseDown(countryField)
    fireEvent.focus(countryField)
    fireEvent.click(countryField)

    fireEvent.change(countryField, { target: { value: 'germ' } })

    const optionsInDropdown = screen.getAllByRole('option')
    expect(optionsInDropdown[0]).toHaveTextContent('Germany')
  })
  it('Should clear the Country field when Backspace key is pressed and show dropdown list is displayed with countries in alphabetic order', () => {
    const countryField = screen.getByRole('combobox')
    fireEvent.mouseDown(countryField)
    fireEvent.focus(countryField)
    fireEvent.click(countryField)

    fireEvent.change(countryField, { target: { value: 'Ukraine' } })
    fireEvent.change(countryField, { target: { value: '' } })

    expect(countryField).toHaveValue('')
    expect(countryField).toHaveFocus()
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const optionsInDropdown = screen.getAllByRole('option')
    const countryNames = optionsInDropdown.map((option) =>
      option.textContent?.trim()
    )
    const sortedCountryNames = [...countryNames].sort()
    expect(countryNames).toEqual(sortedCountryNames)
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
  it('Should render Autocomplete and open dropdown when clicking on City field', () => {
    const autocomplete = screen.getByLabelText(/common.labels.city/i)
    fireEvent.mouseDown(autocomplete)

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const option = screen.getByText('Verhovyna')
    fireEvent.click(option)

    expect(onChange).toHaveBeenCalled()
  })
  it('Should display dropdown list in alphabetic order and show text cursor when clicking on City field', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)

    expect(cityField).toHaveFocus()

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const optionsInDropdown = screen.getAllByRole('option')

    const cityNames = optionsInDropdown.map((option) =>
      option.textContent?.trim()
    )
    const sortedCityNames = [...cityNames].sort()
    expect(cityNames).toEqual(sortedCityNames)
  })
  it('Should show filtered results based on user input', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)

    fireEvent.change(cityField, { target: { value: 'Verhovy' } })

    const optionsInDropdown = screen.getAllByRole('option')
    expect(optionsInDropdown[0]).toHaveTextContent('Verhovyna')
  })
  it('Should clear the City field when Backspace key is pressed', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.mouseDown(cityField)
    fireEvent.focus(cityField)
    fireEvent.click(cityField)

    fireEvent.change(cityField, { target: { value: 'Verhovyna' } })
    fireEvent.change(cityField, { target: { value: '' } })

    expect(cityField).toHaveValue('')
    expect(cityField).toHaveFocus()
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const optionsInDropdown = screen.getAllByRole('option')
    const cityNames = optionsInDropdown.map((option) =>
      option.textContent?.trim()
    )
    const sortedCityNames = [...cityNames].sort()
    expect(cityNames).toEqual(sortedCityNames)
  })
  it('Should show filtered results based on text input in City field', async () => {
    const cityField = screen.getByRole('combobox')
    fireEvent.click(cityField)

    fireEvent.change(cityField, { target: { value: 'Frankivsk' } })

    const optionsInDropdown = screen.getAllByRole('option')
    expect(optionsInDropdown[0]).toHaveTextContent('Frankivsk')
    expect(optionsInDropdown[0]).not.toHaveTextContent('Verhovyna')
  })
})
