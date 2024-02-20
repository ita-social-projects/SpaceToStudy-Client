import { SortEnum } from '~/types'

export const sortTranslationKeys = [
  {
    title: 'myCoursesPage.sortTitles.newest',
    value: `updatedAt ${SortEnum.Desc}`
  },
  {
    title: 'myCoursesPage.sortTitles.oldest',
    value: `updatedAt ${SortEnum.Asc}`
  }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }
