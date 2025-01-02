import { RequestParams } from '~/types/services/services.index'
import { MyCooperationsFilters, Offer } from '~/types'

export type GetMyOffersParams = Partial<MyCooperationsFilters> &
  RequestParams & {
    id: Offer['author']['_id']
  }
