import { RemoveColumnRules, SortEnum } from '~/types'
import { Attachment } from '~/types'

import { getFormattedDate } from '~/utils/helper-functions'
import { convertBytesToProperSize } from '~/utils/bytes-to-proper-size'

import IconExtentionWithTitle from '~/components/icon-extention-with-title/IconExtentionWithTitle'

export const initialSort = { order: SortEnum.Desc, orderBy: 'createdAt' }

export const columns = [
  {
    label: 'attachment.file',
    field: 'fileName',
    calculatedCellValue: (item: Attachment) => (
      <IconExtentionWithTitle title={item.fileName} />
    )
  },
  {
    label: 'attachment.size',
    title: 'size',
    calculatedCellValue: (item: Attachment) =>
      convertBytesToProperSize(item.size)
  },
  {
    label: 'attachment.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Attachment) =>
      getFormattedDate({ date: item.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['attachment.updated']
}
