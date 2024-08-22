import { FindOffersFilters, UserRoleEnum } from '~/types'

export const defaultFilters: FindOffersFilters = {
  categoryId: '',
  subjectId: '',
  sort: 'createdAt',
  language: null,
  native: 'false',
  rating: '0',
  search: '',
  proficiencyLevel: [],
  price: undefined,
  page: '1',
  authorRole: UserRoleEnum.Student
}

export const defaultResponse = { items: [], count: 0 }

export const itemsPerPage = 6
