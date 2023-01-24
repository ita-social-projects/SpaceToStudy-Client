import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { getCountries, getCities } from '~/services/location-service'

jest.mock('axios')

// const getCountries = jest.fn(() => ['Argentina', 'Germany', 'Italy']) // jest.fn().mockResolvedValue([]),
const countriesMock = ['Argentina', 'Germany', 'Italy']

describe('Location service test', () => {
  it('should return countries from', async () => {
    axios.get.mockResolvedValueOnce(countriesMock)

    const result = await getCountries()
    expect(result).toEqual(countriesMock)
  })
})
