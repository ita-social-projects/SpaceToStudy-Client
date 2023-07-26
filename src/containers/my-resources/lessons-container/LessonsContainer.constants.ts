// import {
//     Offer,
//     RemoveColumnRules
// } from '~/types'

// export const columns = [
//     {
//       label: 'myOffersPage.tableHeaders.title',
//       calculatedCellValue: (item: Offer) => <StatusChip status={'action'} />
//     }
//   ]

// export const removeColumnRules: RemoveColumnRules<Offer> = {
//   tablet: [
//     'myOffersPage.tableHeaders.updated',
//     'myOffersPage.tableHeaders.status'
//   ]
// }
import { Lesson, Offer, RemoveColumnRules } from '~/types'
import { getFormatedDate } from '~/utils/helper-functions'

export const columns = [
  {
    label: 'Lesson title',
    field: 'title',
    calculatedCellValue: (item: Lesson) => item.title
  },
  {
    label: 'Attachments',
    calculatedCellValue: (item: Lesson) =>
      `${item.attachments.length + 1} Attachments`
  },
  {
    label: 'Last updates',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) => getFormatedDate(item.updatedAt)
  }
]

// {
//   _id: 'ewqdwqdqwd2312',
//   title: 'Learn english',
//   attachments: 0,
//   updatedAt: new Date().toString(),
//   createdAt: new Date().toString()
// }

export const removeColumnRules: RemoveColumnRules<Offer> = {
  tablet: [
    'myOffersPage.tableHeaders.updated',
    'myOffersPage.tableHeaders.status'
  ]
}
