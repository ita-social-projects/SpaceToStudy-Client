import Typography from '@mui/material/Typography'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import {
  getFormattedDate,
  convertBytesToProperFormat
} from '~/utils/helper-functions'

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
    label: 'myResourcesPage.attachments.size',
    title: 'size',
    calculatedCellValue: (
      item: Attachment,
      { t }: AdditionalPropsInterface
    ) => {
      const { size, unit } = convertBytesToProperFormat(item.size)
      return <Typography>{size + ' ' + t(`common.${unit}`)}</Typography>
    }
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
