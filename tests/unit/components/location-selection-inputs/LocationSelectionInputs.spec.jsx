import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'

import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const onDataChangeMock = vi.fn()

const mockCities = ['City1', 'City2']
const mockCountries = [
  { name: 'Country1', iso2: 'C1' },
  { name: 'Country2', iso2: 'C2' }
]
const initialData = { country: 'country0', city: 'city0' }

describe('LocationSelectionInputs', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.location.getCountries)
        .reply(200, mockCountries)
      mockAxiosClient
        .onGet(`${URLs.location.getCities}/${mockCountries[0].iso2}`)
        .reply(200, mockCities)
      render(
        <LocationSelectionInputs
          data={initialData}
          onDataChange={onDataChangeMock}
        />
      )
    })
  })

  it('renders without crashing', () => {
    expect(screen.getByLabelText('common.labels.country')).toBeInTheDocument()
    expect(screen.getByLabelText('common.labels.city')).toBeInTheDocument()
  })

  it('changes the value of the country input when a country is selected', async () => {
    const autocomplete = screen.getByLabelText('common.labels.country')
    expect(autocomplete).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(autocomplete)
      fireEvent.change(autocomplete, { target: { value: 'Country1' } })
    })
    expect(autocomplete.value).toBe('Country1')
  })

  it('changes the value of the city input when a city is selected', async () => {
    const autocomplete = screen.getByLabelText('common.labels.city')
    expect(autocomplete).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(autocomplete)
      fireEvent.change(autocomplete, { target: { value: 'city1' } })
    })
    expect(autocomplete.value).toBe('city1')
  })
  it('calls onDataChange with correct arguments when country is changed', async () => {
    const countryAutocomplete = screen.getByLabelText('common.labels.country')
    act(() => {
      fireEvent.click(countryAutocomplete)
      fireEvent.change(countryAutocomplete, {
        target: { value: 'Country1' }
      })
      fireEvent.keyDown(countryAutocomplete, { key: 'ArrowDown' })
      fireEvent.keyDown(countryAutocomplete, { key: 'Enter' })
    })

    waitFor(() => {
      expect(countryAutocomplete.value).toBe('Country1')
    })
  })
})
