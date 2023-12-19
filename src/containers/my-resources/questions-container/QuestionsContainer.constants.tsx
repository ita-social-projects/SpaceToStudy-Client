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
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { CheckIcons } from '~/utils/check-icons'
import { styles } from '~/containers/my-resources/questions-container/QuestionsContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'

export const columns: TableColumn<Question>[] = [
  {
    label: 'myResourcesPage.questions.title',
    field: 'title',
    calculatedCellValue: (
      item: Question,
      { navigate }: AdditionalPropsInterface
    ) => {
      const handleClick = () => {
        navigate(
          createUrlPath(authRoutes.myResources.editQuestion.path, item._id)
        )
      }
      return (
        <Box onClick={handleClick} sx={styles.questionContainer}>
          <IconTitleDescription
            description={item.text}
            icon={<Box sx={styles.iconWrapper}>{CheckIcons(item.type)}</Box>}
            sx={styles.iconTitleDescription}
            title={item.title}
          />
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
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
