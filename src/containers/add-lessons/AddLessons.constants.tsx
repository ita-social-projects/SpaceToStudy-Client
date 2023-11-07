import ListAltIcon from '@mui/icons-material/ListAlt'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/add-lessons/AddLessons.styles'

import { getFormattedDate } from '~/utils/helper-functions'
import {
  AdditionalPropsInterface,
  Lesson,
  RemoveColumnRules,
  SortEnum
} from '~/types'

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const columns = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (item: Lesson) => (
      <IconExtensionWithTitle icon={ListAltIcon} title={item.title} />
    )
  },
  {
    label: 'myResourcesPage.lessons.category',
    field: 'category',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) =>
      item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) =>
      getFormattedDate({ date: item.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Lesson> = {
  tablet: ['myResourcesPage.lessons.lastUpdates']
}
