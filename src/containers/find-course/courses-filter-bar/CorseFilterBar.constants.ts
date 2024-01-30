import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  { title: 'myCoursesPage.sortTitles.newest', value: SortEnum.Asc },
  { title: 'myCoursesPage.sortTitles.oldest', value: SortEnum.Desc }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }
