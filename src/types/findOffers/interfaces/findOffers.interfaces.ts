import {
  CategoryInterface,
  FindOffersUpdateFilter,
  LanguageFilter,
  Offer,
  ProficiencyLevelEnum,
  RangeArray,
  RequestParams,
  UserRole
} from '~/types'

export interface FindOffersFilters {
  categoryId: CategoryInterface['_id']
  subjectId: string
  sort: string
  language: LanguageFilter
  native: string
  rating: string
  authorRole: UserRole
  price?: RangeArray
  name: string
  proficiencyLevel: ProficiencyLevelEnum[]
  page: string
}

export interface FindOffersFiltersActions<T> {
  updateFilter: FindOffersUpdateFilter<T>
  updateFilterInQuery: FindOffersUpdateFilter<T>
  resetFilters: () => void
  updateQueryParams: () => void
}

export interface CreateOfferBlockProps<T> {
  data: T
  errors: { [K in keyof T]: string }
  handleNonInputValueChange: <K extends keyof T>(key: K, value: T[K]) => void
  handleBlur: (
    key: keyof T
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface FilterQueryHook<T> {
  filters: FindOffersFilters
  countActiveFilters: number
  filterQueryActions: FindOffersFiltersActions<T>
}

export interface GetOffersPrarams
  extends Partial<FindOffersFilters>,
    Partial<Omit<RequestParams, 'sort'>> {
  excludedOfferId: Offer['_id']
  languages: Offer['languages']
}
