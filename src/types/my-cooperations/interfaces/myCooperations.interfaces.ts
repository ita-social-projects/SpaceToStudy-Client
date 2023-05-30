import { CardsViewEnum } from '~/types/findOffers/findOffers.index'
import { RequestParams } from '~/types/services/services.index'

export interface MyCooperationsFilters {
  sort: string
  status: string
  search: string
  view: CardsViewEnum
}

export interface GetCooperationsParams
  extends Partial<MyCooperationsFilters>,
    Omit<RequestParams, 'sort'> {}
