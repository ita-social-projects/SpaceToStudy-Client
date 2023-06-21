import { defaultResponses } from '~/constants'
import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  {
    title: 'findOffers.sortTitles.newest',
    value: 'createdAt desc'
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

export const initialSort = { order: SortEnum.Desc, orderBy: 'createdAt' }

export const tabsInfo = {
  all: {
    label: 'myOffersPage.tabs.all',
    value: ''
  },
  active: {
    label: 'myOffersPage.tabs.active',
    value: 'active'
  },
  draft: {
    label: 'myOffersPage.tabs.draft',
    value: 'draft'
  },
  closed: {
    label: 'myOffersPage.tabs.closed',
    value: 'closed'
  }
}

export const defaultResponse = {
  items: defaultResponses.array,
  count: 0
}
