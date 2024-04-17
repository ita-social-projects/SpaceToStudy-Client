import { CourseFilters } from '~/types'

export const defaultResponse = { items: [], count: 0 }

export const courseItemsLoadLimit = {
  tablet: 6,
  mobile: 6,
  default: 6
}

export const defaultFilters: CourseFilters = {
  title: '',
  category: '',
  subject: '',
  proficiencyLevel: [],
  page: 1
}
