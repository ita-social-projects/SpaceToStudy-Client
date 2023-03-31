import { FindOffersUpdateFilter, RangeArray } from '~/types'

export interface BarMenuFilters {
  [key: string]: string | boolean,
  isActiveOffersType: boolean,
  sortBy: string,
}

export interface FindOffersDefaultFilters {
  sort: string
  language: string
  native: string
  rating: number 
  price: RangeArray
}
export interface FindOffersFilters extends FindOffersDefaultFilters{
  level?: string[];
  name?: string;
}

export interface FindOffersFiltersActions { 
  updateFilter: FindOffersUpdateFilter
  resetFilters: () => void
  updateQueryParams: () => void
}

