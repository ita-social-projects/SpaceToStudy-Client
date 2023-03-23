import { CardsViewTypes } from '~/types/findOffers/types/viewSwitcher.types'

export interface BarMenuFilters {
    isActiveOffersType: boolean
    sortBy: string
    view: CardsViewTypes
  }
