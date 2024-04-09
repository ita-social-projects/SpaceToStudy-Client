import { CardsViewEnum, FindOffersFilters, LanguagesEnum } from '~/types'

export type CardsView = CardsViewEnum.Grid | CardsViewEnum.Inline
export type LanguageFilter = LanguagesEnum | null
export type UpdateFiltersInQuery<T> = (filtersToUpdate: Partial<T>) => void
export type FilterFromQuery = {
  [key: string]: string | string[]
}
export type UpdateOfferFilterByKey = <K extends keyof FindOffersFilters>(
  key: K
) => (value: FindOffersFilters[K]) => void
