import { FindOffersUpdateFilter, RangeArray } from '~/types'

export interface BarMenuFilters {
  [key: string]: string | boolean
  isActiveOffersType: boolean
  sortBy: string
}

export interface FindOffersDefaultFilters {
  sort: string
  language: string
  native: string
  rating: number
  price: RangeArray
}
export interface FindOffersFilters extends FindOffersDefaultFilters {
  level?: string[]
  name?: string
}

export interface FindOffersFiltersActions {
  updateFilter: FindOffersUpdateFilter
  resetFilters: () => void
  updateQueryParams: () => void
}

export interface CreateOfferBlockProps<T> {
  data: T
  errors: { [K in keyof T]: string }
  handleNonInputValueChange: <K extends keyof T>(key: K, value: T[K]) => void
  handleAutocompleteChange: (
    key: keyof T
  ) => (_: React.ChangeEvent<HTMLInputElement>, value: string | null) => void
  handleBlur: (
    key: keyof T
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
}
