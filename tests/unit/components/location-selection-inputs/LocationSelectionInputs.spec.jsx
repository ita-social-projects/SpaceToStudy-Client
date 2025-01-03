import { screen } from '@testing-library/react'
import { afterAll, beforeAll, beforeEach, expect, vi } from 'vitest'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import { URLs } from '~/constants/request'
import {
  mockAxiosClient,
  renderWithProviders,
  selectOption
} from '~tests/test-utils'

const onDataChangeMock = vi.fn()

const mockCities = ['City1', 'City2', 'City3']
const mockCountries = [
  { name: 'Ukraine', iso2: 'UA' },
  { name: 'Country1', iso2: 'C1' },
  { name: 'Country2', iso2: 'C2' },
  { name: 'Country3', iso2: 'C3' }
]
const initialData = { country: 'Country3', city: 'City3' }

describe('LocationSelectionInputs', () => {
  beforeAll(() => {
    mockAxiosClient.onGet(URLs.location.getCountries).reply(200, mockCountries)
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.location.getCitiesByCountryName.replace(':countryName', '')
        )
      )
      .reply(200, mockCities)
  })

  beforeEach(() => {
    renderWithProviders(
      <LocationSelectionInputs
        data={initialData}
        onDataChange={onDataChangeMock}
      />
    )
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should render location selection inputs', () => {
    expect(screen.getByLabelText('common.labels.country')).toBeInTheDocument()
    expect(screen.getByLabelText('common.labels.city')).toBeInTheDocument()
  })

  it('should change the value of the country input', async () => {
    const newCountry = mockCountries[0].name

    const option = screen.getByLabelText('common.labels.country')
    await selectOption(option, newCountry)

    expect(onDataChangeMock).toHaveBeenCalledWith('country', 'Ukraine')
  })

  it('should change the value of the city input after selecting a country', async () => {
    const newCountry = mockCountries[0].name
    const newCity = mockCities[0]

    const countryOption = screen.getByLabelText('common.labels.country')
    await selectOption(countryOption, newCountry)

    expect(onDataChangeMock).toHaveBeenCalledWith('city', null)
    expect(onDataChangeMock).toHaveBeenCalledWith('country', 'Ukraine')

    const cityOption = screen.getByLabelText('common.labels.city')
    await selectOption(cityOption, newCity)

    expect(onDataChangeMock).toHaveBeenCalledWith('city', 'City1')
  })

  it('should enable city field after selecting a country', async () => {
    const countryOption = screen.getByLabelText('common.labels.country')
    await selectOption(countryOption, 'Ukraine')

    const cityOption = screen.getByLabelText('common.labels.city')
    expect(cityOption).not.toBeDisabled()

    expect(onDataChangeMock).toHaveBeenCalledWith('country', 'Ukraine')
  })
})
