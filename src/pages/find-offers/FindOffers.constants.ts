import { FindOffersFilters, UserRoleEnum } from '~/types'

export const defaultFilters = (role: UserRoleEnum): FindOffersFilters => ({
  categoryId: '',
  subjectId: '',
  sort: 'createdAt',
  language: '',
  native: 'false',
  rating: '0',
  authorRole: role,
  search: '',
  proficiencyLevel: [],
  price: undefined,
  page: '1'
})

export const defaultResponse = { offers: [], count: 0 }
