import axios from 'axios'

const API_URL = 'https://countriesnow.space/api/v0.1'

export const LocationService = {
  getCountries: async () => {
    const res = await axios.get(`${API_URL}/countries/states`)
    const countries = res.data.data.map((country) => country.name)

    return [...new Set(countries)]
  },
  getCities: async (country) => {
    const res = await axios.post(`${API_URL}/countries/cities`, {
      country
    })

    console.log(res.data)

    return res.data.data
  }
}
