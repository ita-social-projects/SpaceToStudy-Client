import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { CategoryInterface } from '~/types'

type Options = {
  match: string,
  limit: number
}

export const categoryService = {
  getCategories: (options: Options): Promise<AxiosResponse<CategoryInterface[]>> => {
    return axiosClient.get(URLs.categories.get, { params: options })
  },
  getCategoriesNames: (): Promise<AxiosResponse<string[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
