import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { CategoryInterface, Params } from '~/types'

export const categoryService = {
  getCategories: (params?: Params): Promise<AxiosResponse<CategoryInterface[]>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: (): Promise<AxiosResponse<string[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
