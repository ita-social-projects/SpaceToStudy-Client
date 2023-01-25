import axios from 'axios'
import { LocationService } from '~/services/location-service'

const countriesResponseMock = {
  data: {
    error: false,
    msg: 'returned array of countries',
    data: [{ name: 'Ukraine' }, { name: 'Belgium' }]
  }
}

const citiesResponseMock = { data: { data: ['Antwerp', 'Brussels'] } }

const endpoints = {
  countries: 'https://countriesnow.space/api/v0.1/countries/states',
  cities: {
    url: 'https://countriesnow.space/api/v0.1/countries/cities',
    body: { country: 'Belgium' }
  }
}

jest.mock('axios')

describe('locationService tests', () => {
  it('should return countries', async () => {
    axios.get.mockResolvedValueOnce(countriesResponseMock)

    const result = await LocationService.getCountries()

    expect(axios.get).toHaveBeenCalledWith(endpoints.countries)
    expect(result).toEqual(['Ukraine', 'Belgium'])
  })

  it('should return cities', async () => {
    axios.post.mockResolvedValueOnce(citiesResponseMock)

    const result = await LocationService.getCities('Belgium')

    expect(axios.post).toHaveBeenCalledWith(endpoints.cities.url, endpoints.cities.body)
    expect(result).toEqual(['Antwerp', 'Brussels'])
  })
})
