import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams
} from '~/types'

export const categoryService = {
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<CategoryInterface[]>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
