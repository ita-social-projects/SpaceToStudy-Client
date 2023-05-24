import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { LocationService } from '~/services/location-service'

const countriesDataMock = ['Ukraine', 'Belgium']
const citiesDataMock = ['Antwerp', 'Brussels']
const country = 'Belgium'

describe('locationService tests', () => {
  it('should return countries', async () => {
    mockAxiosClient
      .onGet(URLs.location.getCountries)
      .reply(200, countriesDataMock)

    const result = await LocationService.getCountries()

    expect(result.data).toEqual(countriesDataMock)
  })

  it('should return cities', async () => {
    mockAxiosClient
      .onGet(`${URLs.location.getCities}/${country}`)
      .reply(200, citiesDataMock)

    const result = await LocationService.getCities(country)

    expect(result.data).toEqual(citiesDataMock)
  })
})
