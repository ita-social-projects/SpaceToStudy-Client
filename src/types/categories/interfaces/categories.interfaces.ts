import { CommonEntityFields } from '~/types/common/common.index'
import { RequestParams } from '~/types/services/types/services.types'

export interface CategoriesParams extends RequestParams {
  name: string
}

export interface CreateCategoriesParams {
  name: string
}

export interface CreatedCategory extends CommonEntityFields {
  name: string
  author: string
}
