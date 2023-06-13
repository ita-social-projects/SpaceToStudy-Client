import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const LocationService = {
  getCountries: () => {
    return axiosClient.get(URLs.location.getCountries)
  },
  getCities: (country: string) => {
    return axiosClient.get(createUrlPath(URLs.location.getCities, country))
  }
}
