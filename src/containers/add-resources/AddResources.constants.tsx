import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { getFormattedDate } from '~/utils/helper-functions'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'

import { styles } from '~/containers/add-resources/AddResources.styles'

import {
  AdditionalPropsInterface,
  RemoveColumnRules,
  SortEnum,
  CourseResources
} from '~/types'

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const columns = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (item: CourseResources) => {
      let icon
      if ('content' in item) {
        icon = resourcesData.lesson.icon
      } else if ('items' in item) {
        icon = resourcesData.quiz.icon
      }

      return (
        <IconExtensionWithTitle
          icon={icon}
          title={'title' in item ? item.title : item.fileName}
        />
      )
    }
  },
  {
    label: 'myResourcesPage.lessons.category',
    field: 'category',
    calculatedCellValue: (
      item: CourseResources,
      { t }: AdditionalPropsInterface
    ) =>
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
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (item: CourseResources) =>
      getFormattedDate({ date: item.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<CourseResources> = {
  tablet: ['myResourcesPage.lessons.lastUpdates']
}
