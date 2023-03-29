import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { CategoryInterface } from '~/types'

export const categoryService = {
  getCategories: (): Promise<AxiosResponse<CategoryInterface[]>> => {
    return axiosClient.get(URLs.categories.get)
  }
}
