import MockAdapter from 'axios-mock-adapter'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { LocationService } from '~/services/location-service'

const mockAxiosClient = new MockAdapter(axiosClient)

const countriesDataMock = ['Ukraine', 'Belgium']
const citiesDataMock = ['Antwerp', 'Brussels']
const country = 'Belgium'

describe('locationService tests', () => {
  it('should return countries', async () => {
    mockAxiosClient.onGet(URLs.location.getCountries).reply(200, { data: countriesDataMock })

    const result = await LocationService.getCountries()

    expect(result.data).toEqual(countriesDataMock)
  })

  it('should return cities', async () => {
    mockAxiosClient.onGet(`${URLs.location.getCities}/${country}`).reply(200, { data: citiesDataMock })

    const result = await LocationService.getCities(country)

    expect(result.data).toEqual(citiesDataMock)
  })
})
