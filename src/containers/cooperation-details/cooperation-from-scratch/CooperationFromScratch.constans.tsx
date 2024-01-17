import { SortEnum } from '~/types'

export const cooperationTranslationKeys = [
  { title: 'cooperationDetailsPage.select.openAll', value: 'updatedAt desc' },
  {
    title: 'cooperationDetailsPage.select.openManually',
    value: 'updatedAt asc'
  }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

