import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'

export const LocationService = {
  getCountries: async () => {
    const res = await axiosClient.get(URLs.location.getCountries)

    return res.data
  },
  getCities: async (country) => {
    const res = await axiosClient.get(`${URLs.location.getCities}/${country}`)

    return res.data
  }
}
