import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
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
    expect(cityOption).not.toBeDisabled()
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

  it('should display countries in alphabetical order', async () => {
    const countryOption = screen.getByLabelText('common.labels.country')
    await userEvent.click(countryOption)

    const countryOptions = screen.getAllByRole('option')
    expect(countryOptions).not.toHaveLength(0)

    const countryNames = countryOptions.map((option) => option.textContent)
    const sortedCountryNames = [...countryNames].sort((a, b) =>
      a.localeCompare(b)
    )
    expect(countryNames).toEqual(sortedCountryNames)
  })

  it('should display cities in alphabetical order', async () => {
    const countryOption = screen.getByLabelText('common.labels.country')
    await selectOption(countryOption, 'Ukraine')

    const cityOption = screen.getByLabelText('common.labels.city')
    await userEvent.click(cityOption)

    const cityOptions = screen.getAllByRole('option')
    expect(cityOptions).not.toHaveLength(0)

    const cityNames = cityOptions.map((option) => option.textContent)
    const sortedCityNames = [...cityNames].sort((a, b) => a.localeCompare(b))
    expect(cityNames).toEqual(sortedCityNames)
  })

  it('should allow to save new city after clearing', async () => {
    const cityOption = screen.getByLabelText('common.labels.city')
    expect(cityOption).not.toBeDisabled()
    expect(cityOption).toHaveValue(initialData.city)

    const clearButtons = screen.getAllByLabelText('Clear')
    expect(clearButtons).toHaveLength(2)

    const cityClearButton = clearButtons[1]

    await userEvent.click(cityClearButton)

    expect(onDataChangeMock).toHaveBeenCalledWith('city', null)
    expect(cityOption).toHaveValue('')

    await selectOption(cityOption, mockCities[1])

    expect(onDataChangeMock).toHaveBeenCalledWith('city', mockCities[1])
    expect(cityOption).toHaveValue(mockCities[1])
  })

  it('should allow to save new country after clearing', async () => {
    const countryOption = screen.getByLabelText('common.labels.country')
    expect(countryOption).not.toBeDisabled()
    expect(countryOption).toHaveValue(initialData.country)

    const clearButtons = screen.getAllByLabelText('Clear')
    expect(clearButtons).toHaveLength(2)

    const countryClearButton = clearButtons[0]

    await userEvent.click(countryClearButton)

    expect(onDataChangeMock).toHaveBeenCalledWith('country', null)
    expect(countryOption).toHaveValue('')

    await selectOption(countryOption, mockCountries[1].name)

    expect(onDataChangeMock).toHaveBeenCalledWith(
      'country',
      mockCountries[1].name
    )
    expect(countryOption).toHaveValue(mockCountries[1].name)
  })
})
