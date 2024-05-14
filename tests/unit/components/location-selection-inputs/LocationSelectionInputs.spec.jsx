import { render, screen, waitFor } from '@testing-library/react'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { selectOption } from '~tests/test-utils'

const onDataChangeMock = vi.fn()

const mockCities = ['City1', 'City2', 'City3']
const mockCountries = [
  { name: 'Country1', iso2: 'C1' },
  { name: 'Country2', iso2: 'C2' },
  { name: 'Country3', iso2: 'C3' }
]
const initialData = { country: 'Country3', city: 'City3' }

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
  it('renders location selection inputs', () => {
    expect(screen.getByLabelText('common.labels.country')).toBeInTheDocument()
    expect(screen.getByLabelText('common.labels.city')).toBeInTheDocument()
  })
  it('changes the value of the country input when a country is selected', async () => {
    const newCountry = mockCountries[0].name

    const option = screen.getByLabelText('common.labels.country')
    await selectOption(option, newCountry)
  })
  it('changes the value of the city input when a city is selected after a country is selected', async () => {
    const newCountry = mockCountries[0].name
    const newCity = mockCities[0]

    const countryOption = screen.getByLabelText('common.labels.country')
    await selectOption(countryOption, newCountry)

    const cityOption = screen.getByLabelText('common.labels.city')
    await selectOption(cityOption, newCity)
  })
})
