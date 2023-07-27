import ListAltIcon from '@mui/icons-material/ListAlt'
import { Box, Typography } from '@mui/material'

import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import { Lesson, Offer, RemoveColumnRules } from '~/types'
import { getFormatedDate } from '~/utils/helper-functions'

export const columns = [
  {
    label: 'Lesson title',
    field: 'title',
    calculatedCellValue: (item: Lesson) => (
      <Box sx={styles.lessonTitleContainer}>
        <ListAltIcon sx={styles.lessonIcon} />
        <Typography sx={styles.lessonTitle}>{item.title}</Typography>
      </Box>
    )
  },
  {
    label: 'Attachments',
    calculatedCellValue: (item: Lesson) => (
      <Typography sx={styles.attachmentsTitle}>
        {item.attachments.length + 1} Attachments
      </Typography>
    )
  },
  {
    label: 'Last updates',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) => (
      <Typography sx={styles.dateTitle}>
        {getFormatedDate(item.updatedAt)}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Offer> = {
  tablet: [
    'myOffersPage.tableHeaders.updated',
    'myOffersPage.tableHeaders.status'
  ]
}
