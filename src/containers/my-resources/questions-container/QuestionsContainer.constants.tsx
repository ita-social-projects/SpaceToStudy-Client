import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import AppChip from '~/components/app-chip/AppChip'

import {
  Question,
  RemoveColumnRules,
  SortEnum,
  TableColumn,
  AdditionalPropsInterface
} from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/questions-container/QuestionsContainer.styles'

export const columns: TableColumn<Question>[] = [
  {
    label: 'myResourcesPage.questions.title',
    field: 'title',
    calculatedCellValue: (item: Question) => {
      return (
        <IconTitleDescription
          description={'Which word is the antonym of "benevolent"?'}
          icon={
            <Box sx={styles.iconWrapper}>
              <CheckCircleOutlineIcon />
            </Box>
          }
          sx={styles.iconTitleDescription}
          title={item.title}
        />
      )
    }
  },
  {
    label: 'myResourcesPage.questions.category',
    calculatedCellValue: (item: Question, { t }: AdditionalPropsInterface) =>
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
    label: 'myResourcesPage.questions.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Question) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Question> = {
  tablet: ['myResourcesPage.questions.updated']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
