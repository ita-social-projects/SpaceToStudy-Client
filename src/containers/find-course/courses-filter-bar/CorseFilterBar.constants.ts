import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  { title: 'myCoursesPage.sortTitles.newest', value: 'asc' },
  { title: 'myCoursesPage.sortTitles.oldest', value: 'desc' }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }
