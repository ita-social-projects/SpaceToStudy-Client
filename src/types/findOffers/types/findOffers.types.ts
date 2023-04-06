import { RangeArray, CardsViewEnums } from '~/types'

export type CardsViewTypes = CardsViewEnums.Grid | CardsViewEnums.Inline
export type FindOfferFilterTypes = string | string[] | RangeArray
export type FindOffersUpdateFilter = (
  value: FindOfferFilterTypes,
  key: string
) => void
export type FilterFromQuery = {
  [key: string]: string | string[]
}
