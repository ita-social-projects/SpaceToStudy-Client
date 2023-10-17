import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { getFormattedDate } from '~/utils/helper-functions'
import {
  ComponentEnum,
  Question,
  RemoveColumnRules,
  SortEnum,
  TableColumn,
  AdditionalPropsInterface
} from '~/types'
import { styles } from '~/containers/my-resources/add-questions/AddQuestions.styles'

export const columns: TableColumn<Question>[] = [
  {
    label: 'myResourcesPage.questions.title',
    field: 'title',
    calculatedCellValue: (item: Question) => {
      return (
        <TitleWithDescription
          description={'Which word is the antonym of "benevolent"?'}
          style={styles.titleWithDescription}
          title={
            <Typography
              component={ComponentEnum.Span}
              sx={styles.questionTitle}
            >
              <CheckCircleOutlineIcon sx={styles.questionIcon} />
              {item.title}
            </Typography>
          }
        />
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
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
