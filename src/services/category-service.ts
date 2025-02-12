import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/get-full-url'

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
  getCategoriesNames: () => {
    return baseService.request<CategoryNameInterface[]>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.categories.getNames
      })
    })
  }
}
