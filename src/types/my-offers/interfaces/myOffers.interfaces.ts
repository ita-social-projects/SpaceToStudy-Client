import { RequestParams } from '~/types/services/services.index'
import { MyCooperationsFilters, Offer } from '~/types'

export interface GetMyOffersParams
  extends Partial<MyCooperationsFilters>,
    RequestParams {
  id: Offer['author']['_id']
}
