import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'

export const categoryService = {
  getCategories: (params) => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: () => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
