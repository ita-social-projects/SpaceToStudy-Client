import { FindBookmarksFilters } from '~/types'

export const defaultFilters: FindBookmarksFilters = {
  title: '',
  sort: 'createdAt',
  page: '1'
}

export const defaultResponse = { items: [], count: 0 }

export const itemsPerPage = 6
