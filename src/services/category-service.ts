import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/helper-functions'

export const categoryService = {
  getCategories: (params?: Partial<CategoriesParams>) => {
    const resultUrl = getFullUrl({
      pathname: URLs.categories.get,
      searchParameters: params
    })

    return baseService.request<ItemsWithCount<CategoryInterface>>({
      method: 'GET',
      url: resultUrl
    })
  },
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
