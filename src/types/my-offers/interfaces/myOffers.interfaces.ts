import { RequestParams } from '~/types/services/services.index'
import { MyCooperationsFilters, UserResponse } from '~/types'

export interface GetMyOffersParams
  extends Partial<MyCooperationsFilters>,
    RequestParams {
  id: UserResponse['_id']
}
