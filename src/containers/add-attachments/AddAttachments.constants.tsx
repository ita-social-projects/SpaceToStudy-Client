import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { getFormattedDate } from '~/utils/helper-functions'

import { styles } from '~/containers/add-attachments/AddAttachments.styles'
import {
  AdditionalPropsInterface,
  Attachment,
  RemoveColumnRules,
  SortEnum
} from '~/types'

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const columns = [
  {
    label: 'myResourcesPage.attachments.file',
    field: 'fileName',
    calculatedCellValue: (item: Attachment) => (
      <IconExtensionWithTitle title={item.fileName} />
    )
  },

  {
    label: 'myResourcesPage.attachments.category',
    field: 'category',
    calculatedCellValue: (
      item: Attachment,
      { t }: AdditionalPropsInterface
    ) => (
      <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
        {item.category
          ? item.category.name
          : t('myResourcesPage.categories.noCategory')}
      </AppChip>
    )
  },
  {
    label: 'myResourcesPage.attachments.lastUpdate',
    field: 'updatedAt',
    calculatedCellValue: (item: Attachment) =>
      getFormattedDate({ date: item.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['myResourcesPage.attachments.lastUpdate']
}
