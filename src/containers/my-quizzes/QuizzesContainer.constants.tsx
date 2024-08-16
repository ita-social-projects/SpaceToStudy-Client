import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {
  AdditionalPropsInterface,
  Quiz,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'
import AppChip from '~/components/app-chip/AppChip'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-quizzes/QuizzesContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'

export const columns: TableColumn<Quiz>[] = [
  {
    label: 'myResourcesPage.quizzes.title',
    field: 'title',
    calculatedCellValue: (
      item: Quiz,
      { navigate }: AdditionalPropsInterface
    ) => {
      const handleClick = () => {
        navigate(createUrlPath(authRoutes.myResources.editQuiz.path, item._id))
      }

      return (
        <Box onClick={handleClick} sx={styles.quizTitleContainer}>
          <NoteAltOutlinedIcon sx={styles.quizIcon} />
          <Typography sx={styles.quizTitle}>{item.title}</Typography>
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.quizzes.questions',
    field: 'questions',
    calculatedCellValue: (item: Quiz, { t }: AdditionalPropsInterface) => {
      const amountQuestions = item.items.length

      return (
        <Typography sx={styles.amountQuestions}>
          {t('myResourcesPage.quizzes.questionCount', {
            count: amountQuestions
          })}
        </Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (item: Quiz, { t }: AdditionalPropsInterface) =>
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
    label: 'myResourcesPage.quizzes.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Quiz) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Quiz> = {
  tablet: [
    'myResourcesPage.quizzes.updated',
    'myResourcesPage.quizzes.questions'
  ],
  mobile: [
    'myResourcesPage.quizzes.updated',
    'myResourcesPage.quizzes.questions'
  ]
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
