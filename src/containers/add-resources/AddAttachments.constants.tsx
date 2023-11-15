import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/add-resources/AddResources.styles'
import {
  AdditionalPropsInterface,
  Attachment,
  RemoveColumnRules
} from '~/types'

export const columns = [
  {
    label: 'myResourcesPage.attachments.file',
    field: 'fileName',
    calculatedCellValue: (attachment: Attachment) => (
      <IconExtensionWithTitle title={attachment.fileName} />
    )
  },

  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (
      attachment: Attachment,
      { t }: AdditionalPropsInterface
    ) =>
      attachment.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {attachment.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.attachments.lastUpdate',
    field: 'updatedAt',
    calculatedCellValue: (attachment: Attachment) =>
      getFormattedDate({ date: attachment.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['myResourcesPage.attachments.lastUpdate']
}
