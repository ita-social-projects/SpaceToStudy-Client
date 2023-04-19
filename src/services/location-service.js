import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'

export const LocationService = {
  getCountries: async () => {
    return axiosClient.get(URLs.location.getCountries)
  },
  getCities: (country) => {
    return axiosClient.get(`${URLs.location.getCities}/${country}`)
  }
}
