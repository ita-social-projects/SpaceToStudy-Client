import { FindOffersFilters } from '~/types'

export const defaultFilters: Omit<FindOffersFilters, 'authorRole'> = {
  categoryId: '',
  subjectId: '',
  sort: 'createdAt',
  language: '',
  native: 'false',
  rating: '0',
  search: '',
  proficiencyLevel: [],
  price: undefined,
  page: '1'
}

export const defaultResponse = { offers: [], count: 0 }
