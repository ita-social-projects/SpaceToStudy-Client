import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/add-quizzes/AddQuizzes.styles'

import { getFormattedDate } from '~/utils/helper-functions'
import {
  AdditionalPropsInterface,
  Quiz,
  RemoveColumnRules,
  SortEnum
} from '~/types'

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const columns = [
  {
    label: 'myResourcesPage.quizzes.title',
    field: 'title',
    calculatedCellValue: (item: Quiz) => (
      <IconExtensionWithTitle icon={NoteAltOutlinedIcon} title={item.title} />
    )
  },
  {
    label: 'myResourcesPage.quizzes.category',
    field: 'category',
    calculatedCellValue: (item: Quiz, { t }: AdditionalPropsInterface) => (
      <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
        {item.category
          ? item.category.name
          : t('myResourcesPage.categories.noCategory')}
      </AppChip>
    )
  },
  {
    label: 'myResourcesPage.quizzes.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Quiz) =>
      getFormattedDate({ date: item.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Quiz> = {
  tablet: ['myResourcesPage.quizzes.updated']
}
