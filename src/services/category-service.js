import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const categoryService = {
  getCategories: () => {
    return axiosClient.get(URLs.categories.get)
  }
}
