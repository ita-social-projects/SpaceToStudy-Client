import { URLs } from '~/constants/request'
import { type Country } from '~/types'
import { getFullUrl } from '~/utils/helper-functions'
import { baseService } from './base-service'

export const locationService = {
  getCountries: () => {
    return baseService.request<Country[]>({
      method: 'GET',
      url: URLs.location.getCountries
    })
  },
  getCitiesByCountryName: (countryName: string) => {
    return baseService.request<string[]>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.location.getCitiesByCountryName,
        parameters: { countryName }
      })
    })
  }
}
