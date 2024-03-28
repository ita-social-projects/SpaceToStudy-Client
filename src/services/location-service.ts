import { AxiosResponse } from 'axios'

import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { Country } from '~/types'

export const LocationService = {
  getCountries: (): Promise<AxiosResponse<Country[]>> => {
    return axiosClient.get(URLs.location.getCountries)
  },
  getCities: (country: string): Promise<AxiosResponse<string[]>> => {
    return axiosClient.get(createUrlPath(URLs.location.getCities, country))
  }
}
