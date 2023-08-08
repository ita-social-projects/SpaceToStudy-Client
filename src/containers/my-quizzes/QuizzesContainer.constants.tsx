import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {
  AdditionalPropsInterface,
  QuizInterface,
  RemoveColumnRules,
  TableColumn
} from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-quizzes/QuizzesContainer.styles'

export const columns: TableColumn<QuizInterface>[] = [
  {
    label: 'myResourcesPage.quizzes.quizTitle',
    calculatedCellValue: (item: QuizInterface) => {
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
    calculatedCellValue: (
      item: QuizInterface,
      { t }: AdditionalPropsInterface
    ) => {
      const amountQuestions = item.items.length
      const isOneQuestion = amountQuestions === 1 ? '' : 's'
      return (
        <Typography sx={styles.amountQuestions}>
          {amountQuestions}
          {` ${t(`myResourcesPage.quizzes.question${isOneQuestion}`)}`}
        </Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.quizzes.updated',
    calculatedCellValue: (item: QuizInterface) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<QuizInterface> = {
  tablet: ['myOffersPage.tableHeaders.updated']
}

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
