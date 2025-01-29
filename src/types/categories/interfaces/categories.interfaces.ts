import { Categories } from '~/types/my-resources/myResources.index'
import { RequestParams } from '~/types/services/types/services.types'

export type CategoriesParams = RequestParams & {
  name: string
}

export interface CreateCategoriesParams {
  name: Categories['name']
}
