import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  { title: 'myCoursesPage.sortTitles.newest', value: 'updatedAt desc' },
  { title: 'myCoursesPage.sortTitles.oldest', value: 'updatedAt asc' }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }
