import IconExtentionWithTitle from '~/components/icon-extention-with-title/IconExtentionWithTitle'

import { getFormattedDate } from '~/utils/helper-functions'
import { convertBytesToProperSize } from '~/utils/bytes-to-proper-size'

import { Attachment, RemoveColumnRules, SortEnum } from '~/types'

export const mockItems = [
  {
    _id: '64d27b1a9b560f984ff73ad0',
    author: '64c0b13ad488960d0caa3883',
    fileName: 'document.doc',
    size: 133302,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '64d27b1a9b560f914ff73ad0',
    author: '64c0b13ad488960d0caa3883',
    fileName:
      'Additional Materials - Advanced Quantum mechanics and other cool learning materials.docx',
    size: 13023302,
    createdAt: new Date('2022-10-2').toISOString(),
    updatedAt: new Date('2023-1-1').toISOString()
  }
]
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
