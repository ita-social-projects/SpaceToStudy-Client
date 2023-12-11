import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import AppChip from '~/components/app-chip/AppChip'

import { getFormattedDate } from '~/utils/helper-functions'
import {
  SortEnum,
  TableColumn,
  Attachment,
  AdditionalPropsInterface
} from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

export const columns = (
  onAddCategory: (id: string) => void
): TableColumn<Attachment>[] => [
  {
    label: 'myResourcesPage.attachments.attachmentName',
    field: 'fileName',
    calculatedCellValue: (item: Attachment) => (
      <IconExtensionWithTitle
        description={item.description}
        title={item.fileName}
      />
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (
      item: Attachment,
      { t }: AdditionalPropsInterface
    ) => {
      return item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category.name}
        </AppChip>
      ) : (
        <Typography
          className='addCategory'
          onClick={() => onAddCategory(item._id)}
          sx={styles.addCategoryBtn}
        >
          {t('myResourcesPage.categories.category')}
          <AddIcon />
        </Typography>
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
  tablet: ['myResourcesPage.attachments.lastUpdate'],
  mobile: ['myResourcesPage.attachments.lastUpdate']
}
