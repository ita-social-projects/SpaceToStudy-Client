import { Categories } from '~/types/my-resources/myResources.index'
import { RequestParams } from '~/types/services/types/services.types'

export interface CategoriesParams extends RequestParams {
  name: string
}

export interface CreateCategoriesParams {
  name: Categories['name']
}
