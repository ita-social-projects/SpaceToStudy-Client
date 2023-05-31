import { CardsViewEnum } from '~/types'

export const sortTranslationKeys = [
  {
    title: 'findOffers.sortTitles.newest',
    value: JSON.stringify({ updatedAt: 1 })
  },
  {
    title: 'findOffers.sortTitles.name',
    value: JSON.stringify({ 'user.firstName': 1, 'user.lastName': 1 })
  },
  {
    title: 'findOffers.sortTitles.priceAsc',
    value: JSON.stringify({ price: 1 })
  },
  {
    title: 'findOffers.sortTitles.priceDesc',
    value: JSON.stringify({ price: -1 })
  }
]

export const initialFilters = {
  sort: sortTranslationKeys[0].value,
  search: '',
  status: '',
  view: CardsViewEnum.Grid
}

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
