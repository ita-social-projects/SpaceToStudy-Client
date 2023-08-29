import Typography from '@mui/material/Typography'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { getFormattedDate } from '~/utils/helper-functions'
import {
  SortEnum,
  TableColumn,
  Attachment,
  AdditionalPropsInterface
} from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

export const columns: TableColumn<Attachment>[] = [
  {
    label: 'myResourcesPage.attachments.file',
    field: 'fileName',
    calculatedCellValue: (item: Attachment) => {
      return <IconExtensionWithTitle title={item.fileName} />
    }
  },
  {
    label: 'myResourcesPage.attachments.size',
    field: 'size',
    calculatedCellValue: (
      item: Attachment,
      { t }: AdditionalPropsInterface
    ) => {
      return (
        <Typography sx={styles.sizeTitle}>{`${item.size} ${t(
          'common.megabytes'
        )}`}</Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.attachments.lastUpdate',
    field: 'updatedAt',
    calculatedCellValue: (item: Attachment) => (
      <Typography sx={styles.dateTitle}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}

export const removeColumnRules = {
  tablet: ['myOffersPage.tableHeaders.updated']
}
