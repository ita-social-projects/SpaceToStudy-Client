import ListAltIcon from '@mui/icons-material/ListAlt'
import { Box, Typography } from '@mui/material'
import { defaultResponses } from '~/constants'

import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  AdditionalPropsInterface,
  Lesson,
  Offer,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'

export const columns: TableColumn<Lesson>[] = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (
      item: Lesson,
      { navigate }: AdditionalPropsInterface
    ) => (
      <Box
        onClick={() =>
          navigate(
            createUrlPath(authRoutes.myResources.myLesson.path, item._id)
          )
        }
        sx={styles.lessonTitleContainer}
      >
        <ListAltIcon sx={styles.lessonIcon} />
        <Typography sx={styles.lessonTitle}>{item.title}</Typography>
      </Box>
    )
  },
  {
    label: 'myResourcesPage.lessons.attachments',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) => {
      const attachmentsQty = item.attachments.length

      return (
        <Typography sx={styles.attachmentsTitle}>
          {attachmentsQty}{' '}
          {t(
            `myResourcesPage.lessons.attachment${
              attachmentsQty === 1 ? '' : 's'
            }Qty`
          )}
        </Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) => (
      <Typography sx={styles.dateTitle}>
        {getFormattedDate(item.updatedAt)}
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

export const defaultResponse = {
  items: defaultResponses.array,
  count: 0
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  mobile: 6,
  tablet: 8
}
