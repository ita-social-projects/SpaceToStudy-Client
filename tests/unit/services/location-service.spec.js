import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { locationService } from '~/services/location-service'

const countriesDataMock = ['Ukraine', 'Belgium']
const citiesDataMock = ['Antwerp', 'Brussels']
const country = 'Belgium'

describe('locationService tests', () => {
  it('should return countries', async () => {
    mockAxiosClient
      .onGet(URLs.location.getCountries)
      .reply(200, countriesDataMock)

    const result = await locationService.getCountries()

    expect(result).toEqual(countriesDataMock)
  })

  it('should return cities', async () => {
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.location.getCitiesByCountryName.replace(':countryName', '')
        )
      )
      .reply(200, citiesDataMock)

    const result = await locationService.getCitiesByCountryName(country)

    expect(result).toEqual(citiesDataMock)
  })
})
