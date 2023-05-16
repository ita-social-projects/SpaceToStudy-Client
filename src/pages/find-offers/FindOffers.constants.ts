import { FindOffersFilters, UserRoleEnum } from '~/types'

export const defaultFilters: FindOffersFilters = {
  categoryId: '',
  subjectId: '',
  sort: 'createdAt',
  language: '',
  native: 'false',
  rating: '0',
  authorRole: UserRoleEnum.Tutor,
  name: '',
  proficiencyLevel: [],
  price: undefined,
  page: '1'
}

export const defaultResponse = { offers: [], count: 0 }
