import { CardsViewTypes } from '~/types'

export interface BarMenuFilters {
  [key: string]: string | boolean,
  isActiveOffersType: boolean,
  sortBy: string,
  offersView: CardsViewTypes
}
