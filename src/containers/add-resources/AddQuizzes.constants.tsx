import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/add-resources/AddResources.styles'
import { getFormattedDate } from '~/utils/helper-functions'
import { AdditionalPropsInterface, Quiz, RemoveColumnRules } from '~/types'

export const columns = [
  {
    label: 'myResourcesPage.quizzes.title',
    field: 'title',
    calculatedCellValue: (quiz: Quiz) => (
      <IconExtensionWithTitle
        icon={<NoteAltOutlinedIcon />}
        title={quiz.title}
      />
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (quiz: Quiz, { t }: AdditionalPropsInterface) =>
      quiz.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {quiz.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.quizzes.updated',
    field: 'updatedAt',
    calculatedCellValue: (quiz: Quiz) =>
      getFormattedDate({ date: quiz.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Quiz> = {
  tablet: ['myResourcesPage.quizzes.updated']
}
