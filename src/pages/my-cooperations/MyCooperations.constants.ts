import { defaultResponses } from '~/constants'
import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  {
    title: 'findOffers.sortTitles.newest',
    value: 'updatedAt desc'
  },
  {
    title: 'findOffers.sortTitles.name',
    value: 'name asc'
  },
  {
    title: 'findOffers.sortTitles.priceAsc',
    value: 'price asc'
  },
  {
    title: 'findOffers.sortTitles.priceDesc',
    value: 'price desc'
  }
]

export const initialFilters = {
  search: '',
  status: ''
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const tabsInfo = {
  all: {
    label: 'cooperationsPage.tabs.all',
    value: ''
  },
  active: {
    label: 'cooperationsPage.tabs.active',
    value: 'active'
  },
  pending: {
    label: 'cooperationsPage.tabs.pending',
    value: 'pending'
  },
  closed: {
    label: 'cooperationsPage.tabs.closed',
    value: 'closed'
  }
}

export const defaultResponse = {
  items: defaultResponses.array,
  count: 0,
  countByStatus: defaultResponses.object
}
