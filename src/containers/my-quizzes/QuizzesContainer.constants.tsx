import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {
  AdditionalPropsInterface,
  Quiz,
  RemoveColumnRules,
  TableColumn
} from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-quizzes/QuizzesContainer.styles'

export const columns: TableColumn<Quiz>[] = [
  {
    label: 'myResourcesPage.quizzes.title',
    calculatedCellValue: (item: Quiz) => {
      return (
        <Box sx={styles.quizTitleContainer}>
          <NoteAltOutlinedIcon sx={styles.quizIcon} />
          <Typography sx={styles.quizTitle}>{item.title}</Typography>
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.quizzes.questions',
    calculatedCellValue: (item: Quiz, { t }: AdditionalPropsInterface) => {
      const amountQuestions = item.items.length
      const isOneQuestion = amountQuestions === 1 ? '' : 's'
      const questionText = t(`myResourcesPage.quizzes.question`)
      return (
        <Typography sx={styles.amountQuestions}>
          {amountQuestions}
          {` ${questionText}${isOneQuestion}`}
        </Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.quizzes.updated',
    calculatedCellValue: (item: Quiz) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Quiz> = {
  tablet: ['myOffersPage.tableHeaders.updated']
}

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
