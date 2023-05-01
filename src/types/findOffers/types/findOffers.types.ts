import { CardsViewEnum, FindOffersFilters, LanguagesEnum } from '~/types'

export type CardsView = CardsViewEnum.Grid | CardsViewEnum.Inline
export type LanguageFilter = LanguagesEnum | ''
export type FindOffersUpdateFilter<T> = <K extends keyof T>(
  value: T[K],
  key: K
) => void
export type FilterFromQuery = {
  [key: string]: string | string[]
}
export type UpdateOfferFilterByKey = <K extends keyof FindOffersFilters>(
  key: K
) => (value: FindOffersFilters[K]) => void
