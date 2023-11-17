import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/add-resources/AddResources.styles'
import {
  Question,
  RemoveColumnRules,
  TableColumn,
  AdditionalPropsInterface,
  ComponentEnum
} from '~/types'

export const columns: TableColumn<Question>[] = [
  {
    label: 'myResourcesPage.questions.title',
    field: 'title',
    calculatedCellValue: (question: Question) => {
      return (
        <TitleWithDescription
          description={question.text}
          style={styles.titleWithDescription}
          title={
            <Typography
              component={ComponentEnum.Span}
              sx={styles.questionTitle}
            >
              <CheckCircleOutlineIcon sx={styles.questionIcon} />
              {question.title}
            </Typography>
          }
        />
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    calculatedCellValue: (
      question: Question,
      { t }: AdditionalPropsInterface
    ) =>
      question.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {question.category.name}
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
    calculatedCellValue: (question: Question) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: question.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Question> = {
  tablet: ['myResourcesPage.questions.updated']
}
